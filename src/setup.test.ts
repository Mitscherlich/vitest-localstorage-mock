import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('setup', () => {
  const originalDescriptors = {}
  const globalKeys = [
    '_localStorage', 'localStorage',
    '_sessionStorage', 'sessionStorage',
  ]

  beforeEach(() => {
    globalKeys.forEach((key) => {
      originalDescriptors[key] = Object.getOwnPropertyDescriptor(globalThis, key)
      delete globalThis[key]
    })
    vi.resetModules()
  })

  afterEach(() => {
    globalKeys.forEach((key) => {
      delete globalThis[key]
      if (originalDescriptors[key])
        Object.defineProperty(globalThis, key, originalDescriptors[key])
    })
  })

  it.each([false, true])('should replace getter-only storage properties (backing storage: %s)', async (hasBackingStorage) => {
    const getter = vi.fn(() => {
      throw new Error('Native storage should not be accessed')
    })
    ;['localStorage', 'sessionStorage'].forEach((key) => {
      Object.defineProperty(globalThis, key, {
        configurable: true,
        enumerable: true,
        get: getter,
      })
      if (hasBackingStorage)
        globalThis[`_${key}`] = {}
    })

    await import('./setup')

    ;['localStorage', 'sessionStorage'].forEach((key) => {
      const storage = globalThis[key]
      storage.setItem('foo', 'value')
      expect(storage.getItem('foo')).toBe('value')
      expect(vi.isMockFunction(storage.setItem)).toBe(true)
      expect(Object.getOwnPropertyDescriptor(globalThis, key)).toMatchObject({
        configurable: true,
        enumerable: true,
        writable: true,
      })
      if (hasBackingStorage)
        expect(storage).toBe(globalThis[`_${key}`])
    })
    expect(getter).not.toHaveBeenCalled()
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
