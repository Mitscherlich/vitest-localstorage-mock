import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('setup', () => {
  const originalImpGlobals = {}

  const setupGlobals = (restore = false) => {
    [
      '_localStorage', 'localStorage',
      '_sessionStorage', 'sessionStorage',
    ].forEach((globalKey) => {
      if (restore) {
        delete global[globalKey]
        global[globalKey] = originalImpGlobals[globalKey]
      }
      else {
        originalImpGlobals[globalKey] = global[globalKey]
        delete global[globalKey]
      }
    })
  }

  const restoreGlobals = () => setupGlobals(true)

  const resetModuleRegistry = () => {
    delete require.cache[require.resolve('./setup')]
  }

  beforeEach(() => {
    setupGlobals()
    resetModuleRegistry()
  })

  afterEach(() => {
    restoreGlobals()
  })

  ;['_localStorage', '_sessionStorage'].forEach((gKey) => {
    it(`[${gKey}] should define a property on the global object with writable false`, () => {
      require('./setup')
      expect(global[gKey.replace('_', '')].constructor.name).toBe(
        'LocalStorage',
      )
    })

    it(`[${gKey}] should define a property on the global object with writable false`, () => {
      global[gKey] = true
      require('./setup')
      let e
      try {
        global[`_${gKey.replace('_', '')}`] = 'blah'
      }
      catch (_e) {
        e = _e
      }
      expect(e).toBeDefined()
    })
  })
})
