'use server'
import { createAuthClient } from '@/server/auth-config'
import { redirect } from 'next/navigation'
import { OAuthProvider } from 'node-appwrite'

export async function signUpWithGithub() {
  const { authInstance } = await createAuthClient()

  const redirectUrl = await authInstance.createOAuth2Token(
    OAuthProvider.Github,
    'https://shamko-blog.vercel.app/api/auth/create-oauth-session',
    'https://shamko-blog.vercel.app/registration'
  )

  return redirect(redirectUrl)
}
