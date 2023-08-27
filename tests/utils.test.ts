import { None, fromValue, fromValueConditional, fromNullable, fromUndefinable, createOptionFactory } from '../index'

describe('Option utility functions', () => {

  describe('fromValue', () => {
    it('should return None for null', () => {
      expect(fromValue(null)).toBe(None)
    })

    it('should return None for undefined', () => {
      expect(fromValue(undefined)).toBe(None)
    })

    it('should return Some for valid values', () => {
      expect(fromValue(5).isSome).toBe(true)
      expect(fromValue('hello').isSome).toBe(true)
    })
  })

  describe('fromValueConditional', () => {
    it('should return None if condition is met', () => {
      expect(fromValueConditional(0, _ => true)).toBe(None)
    })

    it('should return Some if condition is not met', () => {
      expect(fromValueConditional(0, _ => false).isSome).toBe(true)
    })
  })

  describe('fromNullable', () => {
    it('should return None for null', () => {
      expect(fromNullable(null)).toBe(None)
    })

    it.each([undefined, {}, [], 0, ''])
      ('should return Some for non-null values', value => {
        expect(fromNullable(value).isSome).toBe(true)
      })
  })

  describe('fromUndefinable', () => {
    it('should return None for undefined', () => {
      expect(fromUndefinable(undefined)).toBe(None)
    })

    it.each([null, {}, [], 0, ''])
      ('should return Some for non-undefined values', value => {
        expect(fromUndefinable(value).isSome).toBe(true)
      })
  })

  describe('createOptionFactory', () => {
    const positiveNumOptionFactory = createOptionFactory<number>(v => v < 0)

    it('should return None if predicate is met', () => {
      expect(positiveNumOptionFactory(-5)).toBe(None)
    })

    it('should return Some if predicate is not met', () => {
      expect(positiveNumOptionFactory(5).isSome).toBe(true)
    })
  })
})