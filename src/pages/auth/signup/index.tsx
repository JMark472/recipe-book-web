import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { Link } from "react-router";
import { SignupForm } from "@/components/features/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="animate-rise rounded-3xl border border-deep-900/10 bg-white/80 p-6 shadow-xl shadow-deep-900/5 backdrop-blur sm:p-8">
      <AuthFormHeader title="Create your account" description="A little inspiration for your everyday cooking." />

      <SignupForm />

      <p className="mt-6 text-center text-sm text-deep-500">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-semibold text-azure-600 underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
