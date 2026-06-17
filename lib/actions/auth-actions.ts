"use server";

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error)
        return redirect(`/login?error=${encodeURIComponent(error.message)}`)

    revalidatePath("/", "layout");
    return redirect("/dashboard");
}

export async function signup(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const role = formData.get('role') as string

    console.log('FormData received:', { email, password, fullName, role })
    console.log('FormData keys:', Array.from(formData.keys()))

    // Validate inputs
    if (!email || !password || !fullName || !role) {
        return { success: false, message: `All fields are required. Got: email=${email}, fullName=${fullName}, role=${role}` }
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: role
            }
        }
    })

    if (error) {
        return { success: false, message: error.message }
    }

    // Check if email verification is required
    if (data?.user && !data.user.confirmed_at) {
        return {
            success: true,
            message: 'Account created! Please check your email to confirm your account.',
            userId: data.user.id
        }
    }

    return { success: true, message: 'Account created successfully!', userId: data?.user?.id }
}