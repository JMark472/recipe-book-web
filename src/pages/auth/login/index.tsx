import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { Link } from "react-router";
import { LoginForm } from "@/components/features/auth/login-form";

export default function LoginPage() {
  return (
    <div className="animate-rise relative overflow-hidden rounded-3xl border border-deep-900/10 bg-white/80 p-6 shadow-xl shadow-deep-900/5 backdrop-blur sm:p-8">
      {/* Animation "pattern" — drifting dot grid across the white card. */}
      <span aria-hidden="true" className="pattern-dots animate-pattern pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative">
        {/* The page owns its presentation; the feature handles form state and submission. */}
        <AuthFormHeader title="Welcome back" description="Sign in to find your next favorite meal." />

        <LoginForm />

        <p className="mt-6 text-center text-sm text-deep-500">
          New here?{" "}
          <Link to="/auth/signup" className="font-semibold text-azure-600 underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
