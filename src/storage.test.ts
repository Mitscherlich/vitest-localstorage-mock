import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { LocalStorage } from './storage'

describe('storage', () => {
  let storage

  beforeEach(() => {
    storage = new LocalStorage(vitest)
  })

  describe('getItem', () => {
    it('should return null if the item is undefined', () => {
      expect(storage.getItem('item')).toBeNull()
    })

    it('should return \'\' instead of null', () => {
      storage.setItem('item', '')
      expect(storage.getItem('item')).toBe('')
    })
  })
})
