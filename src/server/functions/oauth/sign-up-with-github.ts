'use server'
import { endpoints } from '@/common/constants/endpoints'
import { routes } from '@/common/constants/routes'
import { createAuthClient } from '@/server/auth-config'
import { redirect } from 'next/navigation'
import { OAuthProvider } from 'node-appwrite'

export async function signUpWithGithub() {
  const { authInstance } = await createAuthClient()

  const redirectUrl = await authInstance.createOAuth2Token(
    OAuthProvider.Github,
    `${endpoints._base}${endpoints.auth_create_oauth_session}`,
    `${endpoints._base}${routes.registration}`
  )

  return redirect(redirectUrl)
}
