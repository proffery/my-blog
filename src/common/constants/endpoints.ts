export const endpoints = {
  _base: `${process.env.NEXT_PUBLIC_HOST_BASE}`,
  auth_changeName: `${process.env.NEXT_PUBLIC_HOST_BASE}/api/auth/change-name`,
  auth_loginEmail: `${process.env.NEXT_PUBLIC_HOST_BASE}/api/auth/login-email`,
  auth_logout: `${process.env.NEXT_PUBLIC_HOST_BASE}/api/auth/logout`,
  auth_me: `${process.env.NEXT_PUBLIC_HOST_BASE}/api/auth/me`,
  auth_oauth: `${process.env.NEXT_PUBLIC_HOST_BASE}/api/auth/oauth`,
  auth_registration: `${process.env.NEXT_PUBLIC_HOST_BASE}/api/auth/registration`,
  auth_sendVerifyEmail: `${process.env.NEXT_PUBLIC_HOST_BASE}/api/auth/send-verify-email`,
  auth_verifyEmail: `${process.env.NEXT_PUBLIC_HOST_BASE}/api/auth/verify-email`,
  users_get_all: `${process.env.NEXT_PUBLIC_HOST_BASE}/api/users/get-all`,
  users_get_user: `${process.env.NEXT_PUBLIC_HOST_BASE}/api/users/get-user`,
} as const
