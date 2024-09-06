import { GetUserRequest } from '@/app/api/users/users.types'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { getAvatarMeta } from '@/server/functions/storage/get-avatar-meta'
import { createStorageClient } from '@/server/storage-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params: { userId } }: GetUserRequest) {
  const { storageInstance } = await createStorageClient()

  try {
    const avatar = await getAvatarMeta({ storageInstance, userId })

    return NextResponse.json({ avatar })
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
