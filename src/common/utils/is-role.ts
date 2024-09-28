export type UserRole = 'Administrator' | 'Moderator' | 'Writer'

export const isRole = (userRoles: null | string[] | undefined, role: UserRole): boolean => {
  return userRoles ? userRoles.some(userRole => userRole === role) : false
}
