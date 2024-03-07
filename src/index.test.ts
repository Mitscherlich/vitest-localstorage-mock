import { beforeEach, describe, expect, test, vitest } from 'vitest'

describe('storage', () => {
  [localStorage, sessionStorage].forEach((storage) => {
    // https://html.spec.whatwg.org/multipage/webstorage.html#storage
    beforeEach(() => {
      storage.clear()
      vitest.clearAllMocks()
    })

    // clear
    // https://html.spec.whatwg.org/multipage/webstorage.html#dom-storage-clear
    test('storage.clear', () => {
      const KEY = 'foo'
      const VALUE = 'bar'
      storage.setItem(KEY, VALUE)
      expect(storage.setItem).toHaveBeenLastCalledWith(KEY, VALUE)
      expect(storage.__STORE__[KEY]).toBe(VALUE)
      expect(Object.keys(storage.__STORE__).length).toBe(1)
      storage.clear()
      expect(storage.clear).toHaveBeenCalledTimes(1)
      expect(Object.keys(storage.__STORE__).length).toBe(0)
      expect(storage.__STORE__[KEY]).toBeUndefined()
      storage.setItem(KEY, VALUE)
      expect(storage.setItem).toHaveBeenLastCalledWith(KEY, VALUE)
      storage.clear()
      expect(storage.clear).toHaveBeenCalledTimes(2)
      expect(Object.keys(storage.__STORE__).length).toBe(0)
      expect(storage.__STORE__[KEY]).toBeUndefined()
    })

    // setItem
    // https://html.spec.whatwg.org/multipage/webstorage.html#dom-storage-setitem
    test('storage.setItem', () => {
      const KEY = 'foo'
      const VALUE1 = 'bar'
      const VALUE2 = 'baz'
      const VALUE3 = 42
      storage.setItem(KEY, VALUE1)
      expect(storage.setItem).toHaveBeenLastCalledWith(KEY, VALUE1)
      expect(storage.__STORE__[KEY]).toBe(VALUE1)
      storage.setItem(KEY, VALUE2)
      expect(storage.setItem).toHaveBeenLastCalledWith(KEY, VALUE2)
      expect(storage.__STORE__[KEY]).toBe(VALUE2)
      // @ts-expect-error by desgin
      storage.setItem(KEY, VALUE3)
      expect(storage.__STORE__[KEY]).toBe(VALUE3.toString())
      // @ts-expect-error by desgin
      storage.setItem(KEY, null)
      expect(storage.__STORE__[KEY]).toBe('null')
      // @ts-expect-error by desgin
      storage.setItem(KEY, undefined)
      expect(storage.__STORE__[KEY]).toBe('undefined')
      // @ts-expect-error by desgin
      storage.setItem(KEY, {})
      expect(storage.__STORE__[KEY]).toBe('[object Object]')
    })

    // getItem
    // https://html.spec.whatwg.org/multipage/webstorage.html#dom-storage-getitem
    test('storage.getItem', () => {
      const KEY = 'foo'
      const VALUE1 = 'bar'
      const VALUE2 = 'baz'
      const DOES_NOT_EXIST = 'does not exist'

      storage.setItem(KEY, VALUE1)
      expect(storage.getItem(KEY)).toBe(VALUE1)
      expect(storage.getItem).toHaveBeenLastCalledWith(KEY)

      storage.setItem(KEY, VALUE2)
      expect(storage.getItem(KEY)).toBe(VALUE2)
      expect(storage.getItem).toHaveBeenLastCalledWith(KEY)

      expect(storage.getItem(DOES_NOT_EXIST)).toBeNull()
      expect(storage.getItem).toHaveBeenLastCalledWith(DOES_NOT_EXIST)
    })

    // removeItem
    // https://html.spec.whatwg.org/multipage/webstorage.html#dom-storage-removeitem
    test('storage.removeItem', () => {
      const KEY = 'foo'
      const VALUE1 = 'bar'
      const VALUE2 = 'baz'
      const DOES_NOT_EXIST = 'does not exist'

      storage.setItem(KEY, VALUE1)
      expect(storage.getItem(KEY)).toBe(VALUE1)
      storage.removeItem(KEY)
      expect(storage.removeItem).toHaveBeenLastCalledWith(KEY)

      expect(storage.getItem(KEY)).toBeNull()
      storage.setItem(KEY, VALUE2)
      storage.removeItem(KEY)
      expect(storage.removeItem).toHaveBeenLastCalledWith(KEY)

      expect(storage.getItem(KEY)).toBeNull()
      storage.removeItem(DOES_NOT_EXIST) // does not throw
      expect(storage.removeItem).toHaveBeenLastCalledWith(DOES_NOT_EXIST)
    })

    // length
    // https://html.spec.whatwg.org/multipage/webstorage.html#dom-storage-length
    // length is not mocked
    test('storage set and remove', () => {
      const KEY1 = 'foo'
      const VALUE = 'bar'
      const KEY2 = 'baz'
      expect(storage.length).toBe(0)
      storage.setItem(KEY1, VALUE)
      expect(storage.setItem).toHaveBeenLastCalledWith(KEY1, VALUE)
      expect(storage.setItem).toHaveBeenCalledTimes(1)
      expect(storage.length).toBe(1)
      storage.setItem(KEY2, VALUE)
      expect(storage.setItem).toHaveBeenLastCalledWith(KEY2, VALUE)
      expect(storage.setItem).toHaveBeenCalledTimes(2)
      expect(storage.length).toBe(2)
      storage.clear()
      expect(storage.clear).toHaveBeenCalledTimes(1)
      expect(storage.length).toBe(0)
    })

    // key
    // https://html.spec.whatwg.org/multipage/webstorage.html#dom-storage-key
    test('storage.key', () => {
      const KEY = 'foo'
      const VALUE = 'bar'
      storage.setItem(KEY, VALUE)
      expect(storage.getItem(KEY)).toBe(VALUE)
      expect(storage.key(0)).toBe(KEY)
      expect(storage.key).toHaveBeenLastCalledWith(0)
      expect(storage.length).toBe(1)
      expect(storage.key(1)).toBeNull()
      expect(storage.key).toHaveBeenLastCalledWith(1)
    })

    test('storage.toString', () => {
      expect(storage.toString()).toEqual('[object Storage]')
      expect(storage.toString).toHaveBeenCalledTimes(1)
    })
  })
})
