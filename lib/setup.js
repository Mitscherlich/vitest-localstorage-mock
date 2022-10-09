/* global vitest */
const { LocalStorage } = require('./localstorage')

if (typeof global._localStorage !== 'undefined') {
  Object.defineProperty(global, '_localStorage', {
    value: new LocalStorage(vitest),
    writable: false,
  })
  global.localStorage = global._localStorage
}
else {
  global.localStorage = new LocalStorage(vitest)
}

if (typeof global._sessionStorage !== 'undefined') {
  Object.defineProperty(global, '_sessionStorage', {
    value: new LocalStorage(vitest),
    writable: false,
  })
  global.sessionStorage = global._sessionStorage
}
else {
  global.sessionStorage = new LocalStorage(vitest)
}
