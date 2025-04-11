export type CustomValidation = {
  field: string
  message: string
  validate(state: any): boolean
}
