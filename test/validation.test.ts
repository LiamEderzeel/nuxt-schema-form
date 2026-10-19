import { describe, expect, it } from 'vitest'
import { getCustomValidationErrors } from '../src/runtime/utils/validation'
import type { CustomValidation } from '../src/runtime/types'

type State = { misc: { permission?: boolean; name?: string } }

const permission: CustomValidation = {
  field: 'misc.permission',
  message: 'Permission is required',
  validate: (state: State) => state.misc.permission === true
}

const name: CustomValidation = {
  field: 'misc.name',
  message: 'Name must not be admin',
  validate: (state: State) => state.misc.name !== 'admin'
}

describe('getCustomValidationErrors', () => {
  it('returns no errors without custom validation', () => {
    expect(getCustomValidationErrors(undefined, {})).toEqual([])
    expect(getCustomValidationErrors([], {})).toEqual([])
  })

  it('returns no errors when every check passes', () => {
    const state = { misc: { permission: true, name: 'Liam' } }

    expect(getCustomValidationErrors([permission, name], state)).toEqual([])
  })

  it('returns an error named after the field for each failing check', () => {
    const state = { misc: { permission: false, name: 'admin' } }

    expect(getCustomValidationErrors([permission, name], state)).toEqual([
      { name: 'misc.permission', message: 'Permission is required' },
      { name: 'misc.name', message: 'Name must not be admin' }
    ])
  })

  it('passes the whole form state to each check', () => {
    const state = { misc: { permission: true } }
    const received: unknown[] = []
    const spy: CustomValidation = {
      field: 'misc.permission',
      message: 'unused',
      validate: value => {
        received.push(value)
        return true
      }
    }

    getCustomValidationErrors([spy], state)

    expect(received).toEqual([state])
  })
})
