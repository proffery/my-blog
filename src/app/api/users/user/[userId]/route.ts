import { GetUserRequest } from '@/app/api/users/users.types'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { userById } from '@/server/functions/users/user-by-id'
import { createUsersClient } from '@/server/users-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params: { userId } }: GetUserRequest) {
  const { usersInstance } = await createUsersClient()

  try {
    const user = await userById({ userId, usersInstance })

    return NextResponse.json({ user })
  } catch (error: unknown) {
    serverErrorHandler(error)
  }
}
