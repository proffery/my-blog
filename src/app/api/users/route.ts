import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { allUsers } from '@/server/functions/users/all-users'
import { createUsersClient } from '@/server/users-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { usersInstance } = await createUsersClient()

  const { searchParams } = new URL(request.url)
  const sort = searchParams.get('sort')
  const sortBy = searchParams.get('sortBy')

  try {
    const usersList = await allUsers({ sort, sortBy, usersInstance })

    return NextResponse.json(usersList)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
