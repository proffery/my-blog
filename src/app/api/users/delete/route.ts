import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { deleteUser } from '@/server/functions/users/delete-user'
import { updateUserRoles } from '@/server/functions/users/update-user-roles'
import { createUsersClient } from '@/server/users-config'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const { usersInstance } = await createUsersClient()
  const { userId } = await request.json()

  try {
    await deleteUser({
      userId,
      usersInstance,
    })

    return NextResponse.json({ message: 'User deleted successfully.' })
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
