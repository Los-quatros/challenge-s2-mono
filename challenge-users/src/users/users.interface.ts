export interface UserInterface {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  roles?: string
  activation_token?: string
  resetPasswordToken?: string
  avatar?: string
  sellerId?: string
}
