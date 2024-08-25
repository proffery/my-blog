const HOST_BASE = process.env.NEXT_PUBLIC_HOST_BASE

export const endpoints = {
  _base: HOST_BASE,
  auth_changeName: `${HOST_BASE}/api/auth/change-name`,
  auth_loginEmail: `${HOST_BASE}/api/auth/login-email`,
  auth_logout: `${HOST_BASE}/api/auth/logout`,
  auth_me: `${HOST_BASE}/api/auth/me`,
  auth_oauth: `${HOST_BASE}/api/auth/oauth`,
  auth_registration: `${HOST_BASE}/api/auth/registration`,
  auth_sendVerifyEmail: `${HOST_BASE}/api/auth/send-verify-email`,
  auth_verifyEmail: `${HOST_BASE}/api/auth/verify-email`,
  users_get_all: `${HOST_BASE}/api/users/get-all`,
  users_get_user: `${HOST_BASE}/api/users/get-user`,
} as const
