import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { Link } from "react-router";
import { LoginForm } from "@/components/features/auth/login-form";

export default function LoginPage() {
  return (
    <div className="animate-rise rounded-3xl border border-ink-900/10 bg-white/80 p-6 shadow-xl shadow-ink-900/5 backdrop-blur sm:p-8">
      {/* The page owns its presentation; the feature handles form state and submission. */}
      <AuthFormHeader title="Welcome back" description="Sign in to find your next favorite meal." />

      <LoginForm />

      <p className="mt-6 text-center text-sm text-ink-500">
        New here?{" "}
        <Link to="/auth/signup" className="font-semibold text-spice-600 underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
