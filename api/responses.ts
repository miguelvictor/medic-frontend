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

export interface Patient {
  subjectId: number
  nationalId: string
  name: string
  gender: string
  dateOfBirth: string
  ethnicity: string
  email: string | null
  contactNo: string | null
  address: string | null
  dod: string | null
  age: number
}
