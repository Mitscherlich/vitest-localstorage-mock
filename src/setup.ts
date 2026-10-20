import { vitest } from 'vitest'
import { LocalStorage } from './storage'

;['localStorage', 'sessionStorage'].forEach((key) => {
  const storage = new LocalStorage(vitest)
  if (typeof globalThis[`_${key}`] !== 'undefined') {
    Object.defineProperty(globalThis, `_${key}`, {
      value: storage,
      writable: false,
    })
  }
  Object.defineProperty(globalThis, key, {
    value: storage,
    writable: true,
    configurable: true,
    enumerable: true,
  })
})
