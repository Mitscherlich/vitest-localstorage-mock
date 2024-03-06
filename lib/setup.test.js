import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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

  const restoreGlobals = () => {
    vi.unstubAllGlobals()
  }

  const resetModuleRegistry = () => {
    vi.resetModules()
  }

  beforeEach(() => {
    setupGlobals()
    resetModuleRegistry()
  })

  afterEach(() => {
    restoreGlobals()
  })

  ;['_localStorage', '_sessionStorage'].forEach((gKey) => {
    it(`[${gKey}] should define a property on the global object with writable false`, async () => {
      await import('./setup')
      expect(global[gKey.replace('_', '')].constructor.name).toBe(
        'LocalStorage',
      )
    })

    it(`[${gKey}] should define a property on the global object with writable false`, async () => {
      global[gKey] = true
      await import('./setup')
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
