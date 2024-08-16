import { createSessionClient } from '@/server/config'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const { account } = await createSessionClient(request)

  try {
    await account.deleteSession('current')

    return NextResponse.json({ message: 'Successfully logged out!' })
  } catch (err) {
    console.log(err)

    return NextResponse.json({ message: err.response.message }, { status: err.code })
  }
}
