import SignupForm from "@/components/ui/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Create account
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Get started with Nanomatch</h1>
        <p className="text-sm text-muted-foreground">
          Set up your account and choose a role for your profile.
        </p>
      </header>

      <SignupForm />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
