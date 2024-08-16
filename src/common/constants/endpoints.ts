export const endpoints = {
  base: process.env.NEXT_PUBLIC_API_BASE,
  loginEmail: '/login-email',
  logout: '/logout',
  me: '/me',
  registration: '/registration',
} as const
