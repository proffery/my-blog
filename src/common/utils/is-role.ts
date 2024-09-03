type Role = 'Administrator' | 'Moderator' | 'Writer'

export const isRole = (userRoles: null | string[], role: Role): boolean => {
  return userRoles ? userRoles.some(userRole => userRole === role) : false
}
