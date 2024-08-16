import { createSessionClient } from '@/server/config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { account } = await createSessionClient(request)

  try {
    const user = await account.get()

    return NextResponse.json({ user })
  } catch (err) {
    return NextResponse.json({ message: err.response.message }, { status: err.code })
  }
}
