import React, { useState } from "react";
import "./Login.css";
import { supabase } from "./lib/supabaseClient";

function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@cognitiaxai.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

      if (signInError) {
        setError(
          "Incorrect email or password. Please check your login details."
        );
        return;
      }

      if (!data?.user) {
        setError("Login failed. Please try again.");
        return;
      }

      onLogin(data.user);
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cx-login-page">
      <div className="cx-login-glow cx-login-glow-one" />
      <div className="cx-login-glow cx-login-glow-two" />

      <section className="cx-login-showcase">
        <div className="cx-login-showcase-inner">
          <div className="cx-login-brand-row">
            <div className="cx-login-logo">C</div>
            <div>
              <div className="cx-login-brand-name">CognitiaX AI</div>
              <div className="cx-login-brand-caption">Institute CRM</div>
            </div>
          </div>

          <div className="cx-login-showcase-copy">
            <span className="cx-login-eyebrow">
              CognitiaX AI • Admin Portal
            </span>

            <h1>Everything your institute needs, in one place.</h1>

            <p>
              Manage students, admissions, batches, fees, payments, attendance
              and WhatsApp communication from one clean workspace.
            </p>
          </div>

          <div className="cx-login-feature-list">
            <div className="cx-login-feature-card">
              <div className="cx-feature-icon">01</div>
              <div>
                <strong>Student Management</strong>
                <span>Admissions, batches and student records.</span>
              </div>
            </div>

            <div className="cx-login-feature-card">
              <div className="cx-feature-icon">02</div>
              <div>
                <strong>Fee &amp; Payment Tracking</strong>
                <span>
                  Paid amount, EMI, total paid and pending balance.
                </span>
              </div>
            </div>

            <div className="cx-login-feature-card">
              <div className="cx-feature-icon">03</div>
              <div>
                <strong>WhatsApp Communication</strong>
                <span>Personal reminders and batch announcements.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cx-login-form-area">
        <form className="cx-login-card" onSubmit={handleSubmit}>
          <div className="cx-login-card-topline">
            <span className="cx-login-status-dot" />
            Secure Admin Login
          </div>

          <h2>Welcome back</h2>

          <p className="cx-login-subtitle">
            Sign in to continue to your CognitiaX AI CRM dashboard.
          </p>

          {error && <div className="cx-login-error">{error}</div>}

          <div className="cx-login-field">
            <label htmlFor="crm-login-email">Email Address</label>

            <input
              id="crm-login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cognitiaxai.com"
              autoComplete="username"
              required
            />
          </div>

          <div className="cx-login-field">
            <label htmlFor="crm-login-password">Password</label>

            <div className="cx-login-password-wrap">
              <input
                id="crm-login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="cx-login-show-btn"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            className="cx-login-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in to CRM"}
          </button>

          <div className="cx-login-footer">
            <span>© {new Date().getFullYear()} CognitiaX AI</span>
            <span className="cx-admin-chip">Administrator</span>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;