import { createAdminClient } from '@/server/config'
import { NextRequest, NextResponse } from 'next/server'
import { ID } from 'node-appwrite'

export async function POST(request: NextRequest) {
  try {
    const { account } = await createAdminClient()
    const { email, name, password } = await request.json()

    await account.create(ID.unique(), email, password, name)

    return NextResponse.json({ message: 'Registration complete!' })
  } catch (err) {
    console.log(err)

    return NextResponse.json({ message: err.response.message }, { status: err.code })
  }
}
