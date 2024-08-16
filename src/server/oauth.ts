'use server'
import { routes } from '@/common/constants/routes'
import { createAdminClient } from '@/server/config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { OAuthProvider } from 'node-appwrite'

export async function signUpWithGithub() {
  const { account } = await createAdminClient()

  const origin = headers().get('origin')

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}${routes.oauth}`,
    `${origin}${routes.registration}`
  )

  return redirect(redirectUrl)
}

export async function signUpWithGoogle() {
  const { account } = await createAdminClient()

  const origin = headers().get('origin')

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}${routes.oauth}`,
    `${origin}${routes.registration}`
  )

  return redirect(redirectUrl)
}
