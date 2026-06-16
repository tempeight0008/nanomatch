import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
    const isLoginRoute = request.nextUrl.pathname.startsWith('/login')

    if (!user && isDashboardRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    if (user && isLoginRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}