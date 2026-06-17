import Link from "next/link";
import { login } from "../actions";
import { Button } from "@/components/ui/button";

type LoginPageProps = {
  searchParams?: {
    error?: string | string[];
  };
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  // const errorMessage =
  //   typeof searchParams?.error === "string"
  //     ? searchParams.error
  //     : Array.isArray(searchParams?.error)
  //     ? searchParams.error[0]
  //     : undefined;
  const errorMessage = (await searchParams)?.error && typeof searchParams.error === "string"
    ? searchParams.error
    : undefined;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Sign in
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Log in to continue using Nanomatch and access your dashboard.
        </p>
      </header>

      {errorMessage ? (
        <div className="rounded-3xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}

      <form action={login} className="space-y-6">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground/80">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground/80">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <Button type="submit" className="w-full">Sign in</Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don’t have an account?{' '}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
