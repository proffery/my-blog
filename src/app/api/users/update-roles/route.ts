import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { updateUserRoles } from '@/server/functions/users/update-user-roles'
import { createUsersClient } from '@/server/users-config'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  const { usersInstance } = await createUsersClient()
  const { roles, userId } = await request.json()

  try {
    const updatedUser = await updateUserRoles({
      roles,
      userId,
      usersInstance,
    })

    return NextResponse.json({ roles: updatedUser.labels })
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
