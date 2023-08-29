import { None, fromValue, fromValueConditional, fromNullable, fromUndefinable, createOptionFactory } from '../index'
import fc from "fast-check"

describe('Option utility functions', () => {

  describe('fromValue', () => {
    it('should return None for null', () => {
      expect(fromValue(null)).toBe(None)
    })

    it('should return None for undefined', () => {
      expect(fromValue(undefined)).toBe(None)
    })

    it.each([{}, [], 0, ''])
      ('should return Some for valid values', value => {
        expect(fromValue(value).isSome).toBe(true)
      })
  })

  describe('fromValueConditional', () => {
    it('should return None if condition is met', () => {
      fc.assert(
        fc.property(fc.anything(), value => {
          expect(fromValueConditional(value, _ => true)).toBe(None)
        })
      )
    })

    it('should return Some if condition is not met', () => {
      fc.assert(
        fc.property(fc.anything(), value => {
          expect(fromValueConditional(value, _ => false).isSome).toBe(true)
        })
      )
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
    it('should return a None returning factory when predicate is met', () => {
      fc.assert(
        fc.property(fc.anything(), value => {
          expect(createOptionFactory(_ => true)(value)).toBe(None)
        })
      )
    })

    it('should return Some returning factory when predicate is not met', () => {
      fc.assert(
        fc.property(fc.anything(), value => {
          expect(createOptionFactory(_ => false)(value).isSome).toBe(true)
        })
      )
    })
  })
})