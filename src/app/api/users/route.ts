import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { allUsers } from '@/server/functions/users/all-users'
import { createUsersClient } from '@/server/users-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { usersInstance } = await createUsersClient()

  try {
    const usersList = await allUsers({ usersInstance })

    return NextResponse.json(usersList)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
