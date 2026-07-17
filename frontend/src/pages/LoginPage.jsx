import { useState } from "react";
import { Link } from "react-router";
import { CheckIcon, EyeIcon, EyeOffIcon, LoaderIcon, LockKeyholeIcon, MailIcon, UserRoundIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import "../styles/auth-classic.css";

function LoginPage() {
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const authStore = useAuthStore();
  const isLoading = authStore.isLoggingIn ?? authStore.isLoginIn ?? false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await authStore.login(formData);
  };

  return (
    <main className="classic-auth-page">
      <div className="classic-auth-glow classic-auth-glow-one" />
      <div className="classic-auth-glow classic-auth-glow-two" />
      <section className="classic-auth-card">
        <div className="classic-auth-avatar"><UserRoundIcon /></div>
        <header className="classic-auth-header">
          <h1>Welcome back</h1>
          <p>Sign in to continue chatting</p>
        </header>

        <form className="classic-auth-form" onSubmit={handleSubmit}>
          <label className="classic-auth-field">
            <MailIcon />
            <input type="email" value={formData.Email} onChange={(e) => setFormData((v) => ({ ...v, Email: e.target.value }))} placeholder="Email ID" autoComplete="email" required />
          </label>

          <label className="classic-auth-field">
            <LockKeyholeIcon />
            <input type={showPassword ? "text" : "password"} value={formData.Password} onChange={(e) => setFormData((v) => ({ ...v, Password: e.target.value }))} placeholder="Password" autoComplete="current-password" required />
            <button type="button" className="classic-auth-eye" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </label>

          <div className="classic-auth-options">
            <label className="classic-auth-check">
              <input type="checkbox" />
              <span className="classic-auth-checkbox"><CheckIcon /></span>
              Remember me
            </label>
            <button type="button" className="classic-auth-link-button">Forgot password?</button>
          </div>

          <button className="classic-auth-submit" type="submit" disabled={isLoading}>
            {isLoading ? <><LoaderIcon className="classic-auth-spinner" /> Signing in</> : "Login"}
          </button>
        </form>

        <p className="classic-auth-switch">Don&apos;t have an account?<Link to="/signup">Sign up</Link></p>
      </section>
    </main>
  );
}

export default LoginPage;
