export type User = {
  $createdAt: string
  $id: string
  $updatedAt: string
  accessedAt: string
  email: string
  emailVerification: boolean
  hash: string
  hashOptions: {
    memoryCost: number
    threads: number
    timeCost: number
    type: string
  }
  labels: string[]
  mfa: boolean
  name: string
  password: string
  passwordUpdate: string
  phone: string
  phoneVerification: boolean
  prefs: any
  registration: string
  status: boolean
  targets: {
    $createdAt: string
    $id: string
    $updatedAt: string
    identifier: string
    name: string
    providerId: string
    providerType: string
    userId: string
  }[]
}

export type GetUserResponse = { user?: User }
export type GetUserRequest = { userId: string }
export type GetUsersListResponse = { total: number; users: User[] }
