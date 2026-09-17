const fs = require("node:fs");
const path = require("node:path");

function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    throw new Error(".env file not found.");
  }

  const content = fs.readFileSync(envPath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#") || !line.includes("=")) {
      continue;
    }

    const index = line.indexOf("=");

    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();

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

async function main() {
  loadEnvFile();

  const GRAPH_VERSION = process.env.META_GRAPH_VERSION;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

  const PHONE_NUMBER_ID = "1358708740652588";

  if (!GRAPH_VERSION) {
    throw new Error("META_GRAPH_VERSION is missing in .env");
  }

  if (!ACCESS_TOKEN) {
    throw new Error("META_ACCESS_TOKEN is missing in .env");
  }

  const pin = process.argv[2];

  if (!pin || !/^\d{6}$/.test(pin)) {
    throw new Error(
      "Please provide a 6-digit PIN.\n\nExample:\nnode register-phone.cjs 482615"
    );
  }

  const url =
    `https://graph.facebook.com/${GRAPH_VERSION}/` +
    `${PHONE_NUMBER_ID}/register`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      pin,
    }),
  });

  const data = await response.json();

  console.log("\nMeta API Response:\n");
  console.log(JSON.stringify(data, null, 2));

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "Phone number registration failed."
    );
  }

  if (data?.success === true) {
    console.log("\n✅ WhatsApp phone number registered successfully.");
  }
}

main().catch((error) => {
  console.error("\n❌ Registration failed:");
  console.error(error.message);
  process.exit(1);
});