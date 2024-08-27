'use server'
import { Client, Databases } from 'node-appwrite'

export async function createDatabaseClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT ?? '')

  return {
    get databases() {
      return new Databases(client)
    },
  }
}
