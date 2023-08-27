import { Some, None } from "../index"

describe('Option', () => {

    describe('Some', () => {
        const wrappedValue = 0
        const otherValue = 1
        const option = Some(wrappedValue)

        it('match: should return "Some" value', () => {
            const result = option.match(
                value => value,
                () => otherValue
            )
            expect(result).toBe(wrappedValue)
        })

        it('getValueOrDefault: should return contained value', () => {
            const result = option.getValueOrDefault(otherValue)
            expect(result).toBe(wrappedValue)
        })

        it('getValueOrCompute: should return contained value', () => {
            const result = option.getValueOrCompute(() => otherValue)
            expect(result).toBe(wrappedValue)
        })

        it('map: should correctly transform value', () => {
            const result = option.map(value => value.toString())
            expect(result.match(v => v, () => otherValue.toString())).toBe(wrappedValue.toString())
        })

        it('mapOrDefault: should map the value', () => {
            const result = option.mapOrDefault(v => v.toString(), otherValue.toString())
            expect(result).toBe(wrappedValue.toString())
        })

        it('mapOrCompute: should map the value', () => {
            const result = option.mapOrCompute(v => v.toString(), () => otherValue.toString())
            expect(result).toBe(wrappedValue.toString())
        })

        it('and: should return provided option', () => {
            const other = Some(0)
            const combined = option.and(other)
            expect(combined === other)
        })

        it('andThen: should return result of provided function', () => {
            const other = Some(0)
            const result = option.andThen(() => other)
            expect(result === other)
        })

        it('or: should return itself', () => {
            const other = Some(0)
            const result = option.or(other)
            expect(result === option)
        })

        it('orElse: should return itself', () => {
            const other = Some(0)
            const result = option.orElse(() => other)
            expect(result === option)
        })

        it('filter: should return None when condition is not met', () => {
            const filtered = option.filter(value => value === otherValue)
            expect(filtered === None)
        })

        it('filter: should return itself when condition is met', () => {
            const filtered = option.filter(value => value === wrappedValue)
            expect(filtered === option)
        })

        it('isNone: should return false', () => {
            expect(option.isNone).toBe(false)
        })

        it('isSome: should return true', () => {
            expect(option.isSome).toBe(true)
        })
    })

    describe('None', () => {
        const option = None

        it('match: should return "None" value', () => {
            const expected = "No value found"
            const result = option.match(
                _ => "This shouldn't run",
                () => expected
            )
            expect(result).toBe(expected)
        })

        it('getValueOrDefault: should return default value', () => {
            const expected = "Default"
            const result = option.getValueOrDefault(expected)
            expect(result).toBe(expected)
        })

        it('getValueOrCompute: should return computed value', () => {
            const expected = "Computed"
            const result = option.getValueOrCompute(() => expected)
            expect(result).toBe(expected)
        })

        it('mapOrDefault: should return default value', () => {
            const expected = "Default"
            const result = option.mapOrDefault(v => v, expected)
            expect(result).toBe(expected)
        })

        it('mapOrCompute: should return computed value', () => {
            const expected = "Computed"
            const result = option.mapOrCompute(v => v, () => expected)
            expect(result).toBe(expected)
        })

        it('or: should return provided option', () => {
            const other = Some(0)
            const result = option.or(other)
            expect(result === other)
        })

        it('orElse: should return the result of the provided function', () => {
            const other = Some(0)
            const result = option.orElse(() => other)
            expect(result === other)
        })

        it('filter: should always return None', () => {
            const filtered = option.filter(value => value < 3)
            expect(filtered === None)
        })

        it('isNone: should return true', () => {
            expect(option.isNone).toBe(true)
        })

        it('isSome: should return false', () => {
            expect(option.isSome).toBe(false)
        })
    })
})
