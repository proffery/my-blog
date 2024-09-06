import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { createAvatar } from '@/server/functions/storage/create-avatar'
import { createStorageClient } from '@/server/storage-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { storageInstance } = await createStorageClient()
  const formData = await request.formData()
  const file = formData.get('file') as File
  const userId = formData.get('userId') as string

  try {
    const avatar = await createAvatar({ file, storageInstance, userId })

    return NextResponse.json({ avatar })
  } catch (error: unknown) {
    return serverErrorHandler(error)
  }
}
