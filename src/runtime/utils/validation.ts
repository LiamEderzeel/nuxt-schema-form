import type { CustomValidation } from '../types'

export type CustomValidationError = {
  name: string
  message: string
}

export function getCustomValidationErrors(
  customValidation: CustomValidation[] | undefined,
  state: unknown
): CustomValidationError[] {
  if (!customValidation) return []

  return customValidation
    .filter(({ validate }) => !validate(state))
    .map(({ field, message }) => ({ name: field, message }))
}
