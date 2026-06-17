'use client';
import { signup } from "@/lib/actions/auth-actions";
import { Button } from "@base-ui/react";
import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(signup, null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        console.log('Form submitted with data:', {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role')
        });

        // Manually call formAction with FormData
        formAction(formData);
    };

    useEffect(() => {
        if (state?.success) {
            // Redirect after a short delay to show success message
            const timer = setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [state?.success, router]);

    return (
        <>
            {state?.success === false && (
                <div className="text-destructive bg-destructive/10 p-3 rounded-xl text-sm">
                    {state.message}
                </div>
            )}
            {state?.success === true && (
                <div className="text-green-600 bg-green-500/10 p-3 rounded-xl text-sm">
                    {state.message}
                </div>
            )}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <label className="grid gap-2 text-sm">
                    <span className="font-medium text-foreground/80">Full name</span>
                    <input
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        disabled={isPending || state?.success}
                        className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    />
                </label>

                <label className="grid gap-2 text-sm">
                    <span className="font-medium text-foreground/80">Email</span>
                    <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={isPending || state?.success}
                        className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    />
                </label>

                <label className="grid gap-2 text-sm">
                    <span className="font-medium text-foreground/80">Password</span>
                    <input
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        disabled={isPending || state?.success}
                        className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    />
                </label>

                <label className="grid gap-2 text-sm">
                    <span className="font-medium text-foreground/80">Role</span>
                    <select
                        name="role"
                        required
                        disabled={isPending || state?.success}
                        className="w-full rounded-2xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    >
                        <option value="" hidden>
                            Select available role
                        </option>
                        <option value="designer">Designer</option>
                        <option value="developer">Developer</option>
                        <option value="product">Product</option>
                    </select>
                </label>

                <Button disabled={isPending || state?.success} type="submit" className="w-full">{isPending ? "Creating Account..." : state?.success ? "Redirecting..." : "Create account"}</Button>
            </form>
        </>
    )
}