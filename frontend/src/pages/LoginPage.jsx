import { useState } from "react";
import { Link } from "react-router";
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderIcon,
  LockKeyholeIcon,
  MailIcon,
  UserRoundIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import "../styles/auth-classic.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const authStore = useAuthStore();
  const login = authStore.login;
  const isLoading =
    authStore.isLoggingIn ?? authStore.isLoginIn ?? false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formData);
  };

  return (
    <main className="classic-auth-page">
      <div className="classic-auth-glow classic-auth-glow-one" />
      <div className="classic-auth-glow classic-auth-glow-two" />
      <div className="classic-auth-grid" />

      <section className="classic-auth-card">
        <div className="classic-auth-content">
          <div className="classic-auth-avatar">
            <UserRoundIcon />
          </div>

          <header className="classic-auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to continue chatting</p>
          </header>

          <form className="classic-auth-form" onSubmit={handleSubmit}>
            <label className="classic-auth-field">
              <MailIcon />
              <input
                type="email"
                value={formData.Email}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    Email: event.target.value,
                  }))
                }
                placeholder="Email ID"
                autoComplete="email"
                required
              />
            </label>

            <label className="classic-auth-field">
              <LockKeyholeIcon />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.Password}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    Password: event.target.value,
                  }))
                }
                placeholder="Password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="classic-auth-eye"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </label>

            <div className="classic-auth-options">
              <label className="classic-auth-check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />
                <span className="classic-auth-checkbox">
                  <CheckIcon />
                </span>
                Remember me
              </label>

              <button type="button" className="classic-auth-link-button">
                Forgot Password?
              </button>
            </div>

            <button
              className="classic-auth-submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderIcon className="classic-auth-spinner" />
                  Signing in
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="classic-auth-divider">
            <span />
            <b>OR</b>
            <span />
          </div>

          <button type="button" className="classic-auth-google">
            <span className="classic-auth-google-icon">G</span>
            Sign in with Google
          </button>

          <p className="classic-auth-switch">
            Don&apos;t have an account?
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
