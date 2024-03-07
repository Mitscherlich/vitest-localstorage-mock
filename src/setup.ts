import { vitest } from 'vitest'
import { LocalStorage } from './storage'

if (typeof globalThis._localStorage !== 'undefined') {
  Object.defineProperty(globalThis, '_localStorage', {
    value: new LocalStorage(vitest),
    writable: false,
  })
  globalThis.localStorage = globalThis._localStorage
}
else {
  globalThis.localStorage = new LocalStorage(vitest) as any
}

if (typeof globalThis._sessionStorage !== 'undefined') {
  Object.defineProperty(globalThis, '_sessionStorage', {
    value: new LocalStorage(vitest),
    writable: false,
  })
  globalThis.sessionStorage = globalThis._sessionStorage
}
else {
  globalThis.sessionStorage = new LocalStorage(vitest) as any
}
