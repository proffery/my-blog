import { setLocaleToCookies } from '@/server/functions/locales/set-locale-to-cookies'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { locale } = await request.json()

  try {
    await setLocaleToCookies({ locale })

    return NextResponse.json({ message: `Locale changed to ${locale}` })
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
