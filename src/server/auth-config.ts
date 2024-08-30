'use server'
import { NextRequest } from 'next/server'
import { Account, Client } from 'node-appwrite'

export async function createSessionClient(request: NextRequest) {
  const client = new Client()

  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT ?? '')

  const session = request.cookies.get(`${process.env.NEXT_PUBLIC_SESSION_NAME}`)

  if (session) {
    client.setSession(session.value)
  }

  return {
    get authInstance() {
      return new Account(client)
    },
  }
}

export async function createAuthClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT ?? '')
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY ?? '')

  return {
    get authInstance() {
      return new Account(client)
    },
  }
}
