export const endpoints = {
  _base: `${process.env.NEXT_PUBLIC_HOST_BASE}`,
  auth_changeName: `/api/auth/change-name`,
  auth_create_avatar: `/api/auth/create-avatar`,
  auth_create_oauth_session: `/api/auth/create-oauth-session`,
  auth_delete_avatar: `/api/auth/delete-avatar`,
  auth_loginEmail: `/api/auth/login-email`,
  auth_logout: `/api/auth/logout`,
  auth_me: `/api/auth/me`,
  auth_registration: `/api/auth/registration`,
  auth_sendVerifyEmail: `/api/auth/send-verify-email`,
  auth_verifyEmail: `/api/auth/verify-email`,
  feedbacks_all: `/api/feedbacks`,
  feedbacks_create: `/api/feedbacks/create`,
  feedbacks_delete: `/api/feedbacks/delete`,
  feedbacks_publish: `/api/feedbacks/publish`,
  feedbacks_published: `/api/feedbacks/published`,
  feedbacks_read: `/api/feedbacks/read`,
  post: `/api/post`,
  posts: `/api/posts`,
  posts_create: `/api/posts/create`,
  posts_delete: `/api/posts/delete`,
  posts_not_published: `/api/posts/not-published-posts`,
  posts_publish: `/api/posts/publish`,
  posts_update: `/api/posts/update`,
  users_all: `/api/users`,
  users_avatar: `/api/users/avatar`,
  users_user: `/api/users/user`,
} as const
