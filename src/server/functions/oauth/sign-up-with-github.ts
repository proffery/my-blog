'use server'
import { createAuthClient } from '@/server/auth-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { OAuthProvider } from 'node-appwrite'

export async function signUpWithGithub() {
  const { authInstance } = await createAuthClient()
  const origin = headers().get('origin')
  const redirectUrl = await authInstance.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}/api/auth/create-oauth-session`,
    `${origin}/api/auth/registration`
  )

  return redirect(redirectUrl)
}
