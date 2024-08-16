import { createAdminClient } from '@/server/config'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { account } = await createAdminClient()
    const { email, password } = await request.json()

    const session = await account.createEmailPasswordSession(email, password)

    cookies().set('my-custom-session', session.secret, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
    })

    console.log(session.secret)

    return NextResponse.json({ message: 'Sign-in complete' })
  } catch (err) {
    console.log(err)

    return NextResponse.json({ message: err.response.message }, { status: err.code })
  }
}
