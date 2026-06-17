import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nanomatch | Auth",
};

export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.1),transparent_32%)] flex items-center justify-center px-4 py-12">
            <main className="w-full max-w-md rounded-[2rem] border border-border/70 bg-background/95 p-8 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                {children}
            </main>
        </div>
    );
}
