export type CustomValidation = {
  field: string
  message: string
  validate(state: any): boolean
}

export type PropertiesType = {
  title?: string
  properties: {
    [key: string]: unknown
  }
  [key: string]: unknown
}
