const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

loadEnvFile();

const PORT = Number(process.env.WHATSAPP_SERVER_PORT || 3001);
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || '';
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || '';
const PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID || '';
const WABA_ID = process.env.META_WABA_ID || '';
const LANGUAGE = process.env.WHATSAPP_LANGUAGE || 'en';

const TEMPLATE_MAP = {
  fee_reminder:
    process.env.WHATSAPP_FEE_REMINDER_TEMPLATE || 'fee_reminder',

  payment_received:
    process.env.WHATSAPP_PAYMENT_RECEIVED_TEMPLATE || 'payment_received',

  holiday_announcement:
    process.env.WHATSAPP_HOLIDAY_TEMPLATE || 'holiday_announcement',

  class_update:
    process.env.WHATSAPP_CLASS_UPDATE_TEMPLATE || 'class_update',

  general_announcement:
    process.env.WHATSAPP_GENERAL_ANNOUNCEMENT_TEMPLATE || 'general_announcement',
};

function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env');

  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#') || !line.includes('=')) continue;

    const idx = line.indexOf('=');
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function setCorsHeaders(res, req) {
  const origin = req.headers.origin;

  // Allow the local Vite frontend and direct local testing.
  if (
    origin === 'http://localhost:5173' ||
    origin === 'http://127.0.0.1:5173'
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Vary', 'Origin');
}

function json(res, req, status, body) {
  const payload = JSON.stringify(body);

  setCorsHeaders(res, req);

  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });

  res.end(payload);
}

function cleanPhone(value) {
  let phone = String(value || '').replace(/\D/g, '');

  if (phone.startsWith('00')) {
    phone = phone.slice(2);
  }

  if (phone.length === 10) {
    phone = `91${phone}`;
  }

  if (phone.startsWith('0') && phone.length === 11) {
    phone = `91${phone.slice(1)}`;
  }

  return phone;
}

function configError() {
  const missing = [];

  if (!GRAPH_VERSION) missing.push('META_GRAPH_VERSION');
  if (!ACCESS_TOKEN) missing.push('META_ACCESS_TOKEN');
  if (!PHONE_NUMBER_ID) missing.push('META_PHONE_NUMBER_ID');

  return missing;
}

async function graphFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
}

async function getStatus() {
  const missing = configError();

  if (missing.length) {
    return {
      connected: false,
      missing,
      error: `Missing configuration: ${missing.join(', ')}`,
    };
  }

  const url =
    `https://graph.facebook.com/${GRAPH_VERSION}/` +
    `${PHONE_NUMBER_ID}?fields=id,display_phone_number,verified_name`;

  try {
    const response = await graphFetch(url);
    const data = await response.json();

    if (!response.ok) {
      return {
        connected: false,
        phoneNumberId: PHONE_NUMBER_ID,
        error:
          data?.error?.message ||
          'Meta API rejected the credentials.',
        metaError: data?.error || null,
      };
    }

    return {
      connected: true,
      displayPhoneNumber: data.display_phone_number || '',
      verifiedName: data.verified_name || '',
      phoneNumberId: data.id || PHONE_NUMBER_ID,
    };
  } catch (error) {
    return {
      connected: false,
      phoneNumberId: PHONE_NUMBER_ID,
      error: error.message || 'Unable to reach Meta Graph API.',
    };
  }
}

async function sendTemplate(body) {
  const missing = configError();

  if (missing.length) {
    throw new Error(`Missing configuration: ${missing.join(', ')}`);
  }

  const to = cleanPhone(body.to);

  if (!to || to.length < 11) {
    throw new Error(
      'Invalid WhatsApp number. Use country code, e.g. 919876543210.'
    );
  }

  const templateKey = String(body.templateKey || '').trim();
  const templateName = TEMPLATE_MAP[templateKey];

  if (!templateName) {
    throw new Error(
      `No WhatsApp template configured for ${templateKey || 'unknown template'}.`
    );
  }

  const params = Array.isArray(body.params) ? body.params : [];

  const message = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'template',
    template: {
      name: templateName,
      language: {
        code: body.languageCode || LANGUAGE,
      },
    },
  };

  if (params.length) {
    message.template.components = [
      {
        type: 'body',
        parameters: params.map((text) => ({
          type: 'text',
          text: String(text ?? ''),
        })),
      },
    ];
  }

  const url =
    `https://graph.facebook.com/${GRAPH_VERSION}/` +
    `${PHONE_NUMBER_ID}/messages`;

  const response = await graphFetch(url, {
    method: 'POST',
    body: JSON.stringify(message),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || 'Meta WhatsApp API rejected the message.'
    );
  }

  return {
    messageId: data?.messages?.[0]?.id || '',
    to,
    templateName,
  };
}

async function listTemplates() {
  const missing = configError();

  if (missing.length) {
    throw new Error(`Missing configuration: ${missing.join(', ')}`);
  }

  if (!WABA_ID) {
    throw new Error('META_WABA_ID is required to read message templates.');
  }

  const url =
    `https://graph.facebook.com/${GRAPH_VERSION}/` +
    `${WABA_ID}/message_templates`;

  const response = await graphFetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || 'Unable to read WhatsApp templates.'
    );
  }

  return data;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;

      if (data.length > 1_000_000) {
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(new Error('Invalid JSON body.'));
      }
    });

    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res, req);
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (
      req.method === 'GET' &&
      req.url === '/api/whatsapp/status'
    ) {
      return json(res, req, 200, await getStatus());
    }

    if (
      req.method === 'GET' &&
      req.url === '/api/whatsapp/templates'
    ) {
      try {
        return json(res, req, 200, {
          success: true,
          ...(await listTemplates()),
        });
      } catch (error) {
        return json(res, req, 400, {
          success: false,
          error: error.message,
        });
      }
    }

    if (
      req.method === 'POST' &&
      req.url === '/api/whatsapp/send-template'
    ) {
      const body = await readJson(req);

      try {
        const result = await sendTemplate(body);

        return json(res, req, 200, {
          success: true,
          ...result,
        });
      } catch (error) {
        return json(res, req, 400, {
          success: false,
          error: error.message,
        });
      }
    }

    if (req.method === 'GET' && req.url === '/health') {
      return json(res, req, 200, {
        ok: true,
        service: 'CognitiaX AI WhatsApp Server',
      });
    }

    return json(res, req, 404, {
      error: 'Not found',
    });
  } catch (error) {
    return json(res, req, 500, {
      success: false,
      error: error.message || 'Internal server error',
    });
  }
});

server.listen(PORT, () => {
  console.log(
    `CognitiaX AI WhatsApp server running on http://localhost:${PORT}`
  );

  const missing = configError();

  if (missing.length) {
    console.log(`Missing .env values: ${missing.join(', ')}`);
  } else {
    console.log(
      'Meta WhatsApp credentials detected. ' +
      'Use the CRM Check Connection button to validate them.'
    );
  }
});
