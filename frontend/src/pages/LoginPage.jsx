import { useState } from "react";
import { Link } from "react-router";
import {
  EyeIcon,
  EyeOffIcon,
  LoaderIcon,
  LockIcon,
  MailIcon,
  MessageCircleMoreIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
  WifiIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function LoginPage() {
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoginIn } = useAuthStore();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData);
  };

  return (
    <main className="auth-page">
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />
      <div className="auth-grid" />

      <section className="auth-shell">
        <div className="auth-form-panel">
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <MessageCircleMoreIcon />
            </div>
            <span>ChatConnect</span>
          </div>

          <div className="auth-heading">
            <span className="auth-kicker">
              <SparklesIcon />
              Welcome back
            </span>

            <h1>Continue your conversations.</h1>
            <p>
              Sign in to connect with friends, share moments, and chat in real
              time from anywhere.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="email">Email address</label>

              <div className="auth-input-wrap">
                <MailIcon className="auth-field-icon" />

                <input
                  id="email"
                  type="email"
                  value={formData.Email}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      Email: event.target.value,
                    })
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="password">Password</label>
                <button type="button" className="auth-text-button">
                  Forgot password?
                </button>
              </div>

              <div className="auth-input-wrap">
                <LockIcon className="auth-field-icon" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.Password}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      Password: event.target.value,
                    })
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <label className="auth-remember">
              <input type="checkbox" />
              <span>Keep me signed in</span>
            </label>

            <button
              className="auth-primary-button"
              type="submit"
              disabled={isLoginIn}
            >
              {isLoginIn ? (
                <>
                  <LoaderIcon className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>

          <p className="auth-switch-copy">
            New to ChatConnect?
            <Link to="/signup">Create an account</Link>
          </p>

          <div className="auth-trust-row">
            <span>
              <ShieldCheckIcon />
              Secure login
            </span>
            <span>
              <WifiIcon />
              Real-time chat
            </span>
          </div>
        </div>

        <aside className="auth-visual-panel">
          <div className="auth-visual-topline">
            <span className="auth-live-dot" />
            Live conversations
          </div>

          <div className="auth-visual-copy">
            <h2>Closer conversations, wherever you are.</h2>
            <p>
              ChatConnect keeps your messages fast, focused, and available
              across every screen.
            </p>
          </div>

          <div className="auth-illustration-card">
            <img src="/signup.jpg" alt="People chatting together" />

            <div className="auth-message-card auth-message-card-one">
              <div className="auth-avatar auth-avatar-purple">S</div>
              <div>
                <strong>Sushant</strong>
                <span>Hey! Are you free?</span>
              </div>
            </div>

            <div className="auth-message-card auth-message-card-two">
              <div className="auth-avatar auth-avatar-cyan">A</div>
              <div>
                <strong>Ananya</strong>
                <span className="auth-typing">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            </div>
          </div>

          <div className="auth-stats">
            <div>
              <UsersIcon />
              <span>
                <strong>1.2K+</strong>
                active users
              </span>
            </div>

            <div>
              <MessageCircleMoreIcon />
              <span>
                <strong>Instant</strong>
                messaging
              </span>
            </div>

            <div>
              <ShieldCheckIcon />
              <span>
                <strong>Protected</strong>
                sessions
              </span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default LoginPage;
