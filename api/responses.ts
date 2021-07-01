export interface SigninResponse {
  access: string
  refresh: string
}

export interface RefreshTokenResponse {
  access: string
}

export interface ListObjectsResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Doctor {
  id: number
  nationalId: string
  gender: string
  contactNo: string
  dateOfBirth: string
  workerId: string
  position: string
  startDate: string
  email: string
  name: string
}
