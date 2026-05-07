import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/onboarding'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return NextResponse.redirect(`${origin}/login`)

      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .maybeSingle()

      const destination = profile?.onboarding_completed ? "/dashboard" : next
      return NextResponse.redirect(`${origin}${destination}`)
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}
