const HOST_BASE = process.env.NEXT_PUBLIC_HOST_BASE

export const endpoints = {
  auth_changeName: `${HOST_BASE}/api/auth/change-name`,
  auth_loginEmail: `${HOST_BASE}/api/auth/login-email`,
  auth_logout: `${HOST_BASE}/api/auth/logout`,
  auth_me: `${HOST_BASE}/api/auth/me`,
  auth_oauth: `${HOST_BASE}/api/auth/oauth`,
  auth_registration: `${HOST_BASE}/api/auth/registration`,
  auth_sendVerifyEmail: `${HOST_BASE}/api/auth/send-verify-email`,
  auth_verifyEmail: `${HOST_BASE}/api/auth/verify-email`,
  base: HOST_BASE,
} as const
