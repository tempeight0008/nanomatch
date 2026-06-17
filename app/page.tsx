// src/app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardRoot() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const fullName = user.user_metadata?.full_name ?? 'User'
  const role = user.user_metadata?.role ?? 'Not Selected'

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back, {fullName}</h1>
      <div className="p-4 border rounded-xl bg-muted/40">
        <p className="text-sm text-muted-foreground">
          Active Workspace Role: <span className="font-semibold text-foreground uppercase">{role}</span>
        </p>
      </div>
    </main>
  )
}