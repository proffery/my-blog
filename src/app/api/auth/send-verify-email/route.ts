import { createSessionClient } from '@/server/auth-config'
import { sendVerifyEmail } from '@/server/functions/auth/send-verify-email'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { authInstance } = await createSessionClient(request)

  try {
    await sendVerifyEmail({ authInstance })

    return NextResponse.json({ message: `Verification email sent successfully!` })
  } catch (error: unknown) {
    serverErrorHandler(error)
  }
}
