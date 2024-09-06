'use server'
import { Client, Storage } from 'node-appwrite'

export async function createStorageClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT ?? '')

  return {
    get storageInstance() {
      return new Storage(client)
    },
  }
}
