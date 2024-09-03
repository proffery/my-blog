'use server'
import { createAuthClient } from '@/server/auth-config'
import { redirect } from 'next/navigation'
import { OAuthProvider } from 'node-appwrite'

export async function signUpWithGoogle() {
  const { authInstance } = await createAuthClient()

  const redirectUrl = await authInstance.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/api/auth/create-oauth-session`,
    `${origin}/api/auth/registration`
  )

  return redirect(redirectUrl)
}
