import { cookies } from 'next/headers'
import { Account } from 'node-appwrite'

export const loginEmail = async (payload: {
  authInstance: Account
  email: string
  password: string
}) => {
  const { authInstance, email, password } = payload
  const session = await authInstance.createEmailPasswordSession(email, password)

  cookies().set(`${process.env.NEXT_PUBLIC_SESSION_NAME}`, session.secret, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
  })
}
