'use server'
import { endpoints } from '@/common/constants/endpoints'
import { routes } from '@/common/constants/routes'
import { createAdminAuth } from '@/server/auth'
import { redirect } from 'next/navigation'
import { OAuthProvider } from 'node-appwrite'

export async function signUpWithGithub() {
  const { auth } = await createAdminAuth()

  const redirectUrl = await auth.createOAuth2Token(
    OAuthProvider.Github,
    `${endpoints._base}/${endpoints.auth_oauth}`,
    `${endpoints._base}${routes.registration}`
  )

  return redirect(redirectUrl)
}

export async function signUpWithGoogle() {
  const { auth } = await createAdminAuth()

  const redirectUrl = await auth.createOAuth2Token(
    OAuthProvider.Google,
    `${endpoints._base}/${endpoints.auth_oauth}`,
    `${endpoints._base}${routes.registration}`
  )

  return redirect(redirectUrl)
}
