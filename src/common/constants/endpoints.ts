export const endpoints = {
  base: process.env.NEXT_PUBLIC_HOST_BASE,
  loginEmail: 'api/login-email',
  logout: 'api/logout',
  me: 'api/me',
  oauth: 'api/oauth',
  registration: 'api/registration',
  sendVerifyEmail: 'api/send-verify-email',
  verifyEmail: 'api/verify-email',
} as const
