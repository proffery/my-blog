import { GetAvatarMetaRequest } from '@/app/api/users/users.types'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { getAvatarMeta } from '@/server/functions/storage/get-avatar-meta'
import { createStorageClient } from '@/server/storage-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params: { userId } }: GetAvatarMetaRequest) {
  const { storageInstance } = await createStorageClient()

  try {
    const avatarMeta = await getAvatarMeta({ storageInstance, userId })

    return NextResponse.json(avatarMeta)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
