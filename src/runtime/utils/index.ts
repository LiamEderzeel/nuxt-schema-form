import { isEqual } from 'ohash/utils'

export function pick<Data extends object, Keys extends keyof Data>(data: Data, keys: Keys[]): Pick<Data, Keys> {
  const result = {} as Pick<Data, Keys>

  for (const key of keys) {
    result[key] = data[key]
  }

  return result
}

export function omit<Data extends object, Keys extends keyof Data>(data: Data, keys: Keys[]): Omit<Data, Keys> {
  const result = { ...data }

  for (const key of keys) {
    delete result[key]
  }

  return result as Omit<Data, Keys>
}

export function get<T>(
  object: NestedObject | undefined,
  path: (string | number)[] | string,
  defaultValue?: T
): T | undefined {
  if (typeof path === 'string') {
    path = path.split('.').map(key => {
      const numKey = Number(key)
      return Number.isNaN(numKey) ? key : numKey
    })
  }

  let result: NestedObject | undefined = object

  for (const key of path) {
    if (result === undefined || result === null) {
      return defaultValue
    }

    if (typeof key === 'string' && !(key in result)) {
      return defaultValue
    }

    result = result[key] as NestedObject | undefined
  }

  return result !== undefined ? (result as T) : defaultValue
}

type NestedObject = { [key: string]: any }

export function set(object: NestedObject, path: (string | number)[] | string, value: unknown): void {
  if (typeof path === 'string') {
    path = path.split('.').map(key => {
      const numKey = Number(key)
      return Number.isNaN(numKey) ? key : numKey
    })
  }

  const keys = path
  keys.reduce((acc, key, i) => {
    if (acc[key] === undefined) {
      acc[key] = isLastKey(i, keys) ? value : {}
    } else if (i === keys.length - 1) {
      acc[key] = value
    }
    return acc[key] as NestedObject
  }, object)
}

function isLastKey(index: number, keys: (string | number)[]): boolean {
  return index === keys.length - 1
}

export function looseToNumber(val: any): any {
  if (typeof val !== 'string') return val
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? val : n
}

export function compare<T>(value?: T, currentValue?: T, comparator?: string | ((a: T, b: T) => boolean)) {
  if (value === undefined || currentValue === undefined) {
    return false
  }

  if (typeof value === 'string') {
    return value === currentValue
  }

  if (typeof comparator === 'function') {
    return comparator(value, currentValue)
  }

  if (typeof comparator === 'string') {
    return get(value!, comparator) === get(currentValue!, comparator)
  }

  return isEqual(value, currentValue)
}
