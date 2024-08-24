'use server'
import { endpoints } from '@/common/constants/endpoints'
import { routes } from '@/common/constants/routes'
import { createAdminClient } from '@/server/config'
import { redirect } from 'next/navigation'
import { OAuthProvider } from 'node-appwrite'

export async function signUpWithGithub() {
  const { account } = await createAdminClient()

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${endpoints.auth_oauth}`,
    `${endpoints.base}${routes.registration}`
  )

  return redirect(redirectUrl)
}

export async function signUpWithGoogle() {
  const { account } = await createAdminClient()

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${endpoints.auth_oauth}`,
    `${endpoints.base}${routes.registration}`
  )

  return redirect(redirectUrl)
}
