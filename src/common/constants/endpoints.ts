export const endpoints = {
  auth_changeName: 'api/auth/change-name',
  auth_loginEmail: 'api/auth/login-email',
  auth_logout: 'api/auth/logout',
  auth_me: 'api/auth/me',
  auth_oauth: 'api/auth/oauth',
  auth_registration: 'api/auth/registration',
  auth_sendVerifyEmail: 'api/auth/send-verify-email',
  auth_verifyEmail: 'api/auth/verify-email',
  base: process.env.NEXT_PUBLIC_HOST_BASE,
} as const
