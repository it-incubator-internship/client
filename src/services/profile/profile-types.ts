export type EditProfileArgs = {
  aboutMe?: string | undefined
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  id: string
  lastName: string
  userName: string
}

export type EditProfileResponse = {
  aboutMe: string
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  lastName: string
  originalAvatarUrl: string
  profileStatus: string
  smallAvatarUrl: string
  userName: string
}
