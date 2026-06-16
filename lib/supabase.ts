// lib/supabase/server.ts
import { Database } from '@/types/database.types'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {
            // Handle Server Component cookie limitations
          }
        },
      },
      global: {
        fetch: (url, options) =>
          fetch(url, {
            ...options,
            next: {
              revalidate: 300, // Revalidate every 5 minutes
              tags: ['supabase-data'], // Use tags for on-demand revalidation
            },
          }),
      },
    }
  )
}   