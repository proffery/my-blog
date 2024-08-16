import { createSessionClient } from '@/server/config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { account } = await createSessionClient(request)

  try {
    const user = await account.get()

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ message: error.response.message }, { status: error.code })
  }
}
