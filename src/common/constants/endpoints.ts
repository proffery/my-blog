export const endpoints = {
  _base: process.env.NEXT_PUBLIC_HOST_BASE,
  auth_changeName: `/api/auth/change-name`,
  auth_loginEmail: `/api/auth/login-email`,
  auth_logout: `/api/auth/logout`,
  auth_me: `/api/auth/me`,
  auth_oauth: `/api/auth/oauth`,
  auth_registration: `/api/auth/registration`,
  auth_sendVerifyEmail: `/api/auth/send-verify-email`,
  auth_verifyEmail: `/api/auth/verify-email`,
  users_get_all: `/api/users/get-all`,
  users_get_user: `/api/users/get-user`,
} as const
