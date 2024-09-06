import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { deleteAvatar } from '@/server/functions/storage/delete-avatar'
import { createStorageClient } from '@/server/storage-config'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const { storageInstance } = await createStorageClient()
  const { userId } = await request.json()

  try {
    await deleteAvatar({ storageInstance, userId })

    return NextResponse.json({ message: 'Avatar deleted successfully.' })
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
