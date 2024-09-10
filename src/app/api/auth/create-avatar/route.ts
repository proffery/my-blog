import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { createAvatar } from '@/server/functions/storage/create-avatar'
import { createStorageClient } from '@/server/storage-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { storageInstance } = await createStorageClient()
  const formData = await request.formData()
  const userId = formData.get('userId') as string
  const file = formData.get('file') as File

  try {
    const avatarMeta = await createAvatar({ file, storageInstance, userId })

    return NextResponse.json(avatarMeta)
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
