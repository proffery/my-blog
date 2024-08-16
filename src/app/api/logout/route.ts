import { createSessionClient } from '@/server/config'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const { account } = await createSessionClient(request)

  try {
    await account.deleteSession('current')

    return NextResponse.json({ message: 'Successfully logged out!' })
  } catch (error) {
    console.log(error)

    return NextResponse.json({ message: error.response.message }, { status: error.code })
  }
}
