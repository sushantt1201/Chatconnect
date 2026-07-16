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
  UserIcon,
  UsersIcon,
  WifiIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    Email: "",
    Password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(formData);
  };

  return (
    <main className="auth-page">
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />
      <div className="auth-grid" />

      <section className="auth-shell auth-shell-signup">
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
              Join ChatConnect
            </span>

            <h1>Create your account.</h1>
            <p>
              Start secure, real-time conversations and stay connected from
              anywhere.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="fullName">Full name</label>
              <div className="auth-input-wrap">
                <UserIcon className="auth-field-icon" />
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      fullName: event.target.value,
                    })
                  }
                  placeholder="Sushant Kumar"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signupEmail">Email address</label>
              <div className="auth-input-wrap">
                <MailIcon className="auth-field-icon" />
                <input
                  id="signupEmail"
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
              <label htmlFor="signupPassword">Password</label>
              <div className="auth-input-wrap">
                <LockIcon className="auth-field-icon" />
                <input
                  id="signupPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.Password}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      Password: event.target.value,
                    })
                  }
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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

            <button
              className="auth-primary-button"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <LoaderIcon className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>

          <p className="auth-switch-copy">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </p>

          <div className="auth-trust-row">
            <span>
              <ShieldCheckIcon />
              Secure account
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
            Build your circle
          </div>

          <div className="auth-visual-copy">
            <h2>Start conversations that feel effortless.</h2>
            <p>
              Create your profile, find people, and enjoy fast messaging in one
              clean space.
            </p>
          </div>

          <div className="auth-illustration-card">
            <img src="/login.png" alt="People connecting through chat" />

            <div className="auth-message-card auth-message-card-one">
              <div className="auth-avatar auth-avatar-purple">N</div>
              <div>
                <strong>New connection</strong>
                <span>Welcome to ChatConnect!</span>
              </div>
            </div>

            <div className="auth-message-card auth-message-card-two">
              <div className="auth-avatar auth-avatar-cyan">3</div>
              <div>
                <strong>Friends online</strong>
                <span>Ready to chat</span>
              </div>
            </div>
          </div>

          <div className="auth-stats">
            <div>
              <UsersIcon />
              <span>
                <strong>Connect</strong>
                with friends
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
                <strong>Secure</strong>
                experience
              </span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default SignUpPage;
