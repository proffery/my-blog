'use server'
import { endpoints } from '@/common/constants/endpoints'
import { routes } from '@/common/constants/routes'
import { createAuthClient } from '@/server/auth'
import { redirect } from 'next/navigation'
import { OAuthProvider } from 'node-appwrite'

export async function signUpWithGithub() {
  const { auth } = await createAuthClient()

  const redirectUrl = await auth.createOAuth2Token(
    OAuthProvider.Github,
    `${endpoints.auth_oauth}`,
    `${endpoints._base}${routes.registration}`
  )

  return redirect(redirectUrl)
}

export async function signUpWithGoogle() {
  const { auth } = await createAuthClient()

  const redirectUrl = await auth.createOAuth2Token(
    OAuthProvider.Google,
    `${endpoints.auth_oauth}`,
    `${endpoints._base}${routes.registration}`
  )

  return redirect(redirectUrl)
}
