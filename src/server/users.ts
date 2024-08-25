'use server'
import { Client, Users } from 'node-appwrite'

export async function createAdminUsers() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT ?? '')
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY ?? '')

  return {
    get users() {
      return new Users(client)
    },
  }
}
