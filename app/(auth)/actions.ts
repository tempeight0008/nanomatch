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
    const supabase = await createClient();

    console.log(prevState, formData)

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get('fullName') as string
    const role = formData.get('role') as string

    const { error } = await supabase.auth.signUp({
        email, password, options: {
            data: {
                role,
                full_name: fullName
            }
        }
    })

    if (error) {
        console.log(error);
        return { success: false, message: error.message, error: JSON.stringify(error) };
        // return redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    return redirect('/dashboard')
}