import { useState } from "react";
import { Link } from "react-router";
import { CheckIcon, EyeIcon, EyeOffIcon, LoaderIcon, LockKeyholeIcon, MailIcon, UserIcon, UserRoundPlusIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import "../styles/auth-classic.css";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", Email: "", Password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [localError, setLocalError] = useState("");
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");
    if (formData.Password !== confirmPassword) return setLocalError("Passwords do not match.");
    if (!acceptedTerms) return setLocalError("Please accept the terms to continue.");
    await signup(formData);
  };

  return (
    <main className="classic-auth-page">
      <div className="classic-auth-glow classic-auth-glow-one" />
      <div className="classic-auth-glow classic-auth-glow-two" />
      <section className="classic-auth-card classic-auth-card-signup">
        <div className="classic-auth-avatar"><UserRoundPlusIcon /></div>
        <header className="classic-auth-header">
          <h1>Sign up</h1>
          <p>Create your account and start chatting</p>
        </header>

        <form className="classic-auth-form" onSubmit={handleSubmit}>
          <label className="classic-auth-field">
            <UserIcon />
            <input type="text" value={formData.fullName} onChange={(e) => setFormData((v) => ({ ...v, fullName: e.target.value }))} placeholder="Full Name" autoComplete="name" minLength={2} maxLength={60} required />
          </label>
          <label className="classic-auth-field">
            <MailIcon />
            <input type="email" value={formData.Email} onChange={(e) => setFormData((v) => ({ ...v, Email: e.target.value }))} placeholder="Email ID" autoComplete="email" required />
          </label>
          <label className="classic-auth-field">
            <LockKeyholeIcon />
            <input type={showPassword ? "text" : "password"} value={formData.Password} onChange={(e) => setFormData((v) => ({ ...v, Password: e.target.value }))} placeholder="Password" autoComplete="new-password" minLength={6} required />
            <button type="button" className="classic-auth-eye" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
          </label>
          <label className={`classic-auth-field ${confirmPassword && formData.Password !== confirmPassword ? "classic-auth-field-error" : ""}`}>
            <LockKeyholeIcon />
            <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" autoComplete="new-password" minLength={6} required />
          </label>

          <label className="classic-auth-check classic-auth-terms">
            <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
            <span className="classic-auth-checkbox"><CheckIcon /></span>
            I agree to the Terms &amp; Conditions
          </label>

          {localError && <p className="classic-auth-error">{localError}</p>}

          <button className="classic-auth-submit" type="submit" disabled={isSigningUp}>
            {isSigningUp ? <><LoaderIcon className="classic-auth-spinner" /> Creating account</> : "Sign up"}
          </button>
        </form>

        <p className="classic-auth-switch">Already have an account?<Link to="/login">Login</Link></p>
      </section>
    </main>
  );
}

export default SignUpPage;
