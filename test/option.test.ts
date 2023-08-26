import { Some, None } from "../index"

describe('Option', () => {

    describe('Some', () => {
        const option = Some(5)

        it('match: should return "Some" value', () => {
            const result = option.match(
                () => "No value found",
                (value) => `Value is: ${value}`
            )
            expect(result).toBe("Value is: 5")
        })

        it('getValueOrDefault: should return contained value', () => {
            const result = option.getValueOrDefault(10)
            expect(result).toBe(5)
        })

        it('getValueOrCompute: should return contained value', () => {
            const result = option.getValueOrCompute(() => 10)
            expect(result).toBe(5)
        })

        it('map: should correctly transform value', () => {
            const result = option.map(value => value * 2)
            expect(result.match(() => 0, v => v)).toBe(10)
        })

        it('mapOrDefault: should map the value', () => {
            const result = option.mapOrDefault(v => v * 2, 0)
            expect(result).toBe(10)
        })

        it('mapOrCompute: should map the value', () => {
            const result = option.mapOrCompute(v => v * 2, () => 0)
            expect(result).toBe(10)
        })

        it('and: should return provided option', () => {
            const other = Some(10)
            const combined = option.and(other)
            expect(combined === other)
        })

        it('andThen: should return result of provided function', () => {
            const other = Some(10)
            const result = option.andThen(() => other)
            expect(result === other)
        })

        it('or: should return itself', () => {
            const other = Some(10)
            const result = option.or(other)
            expect(result === option)
        })

        it('orElse: should return itself', () => {
            const result = option.orElse(() => Some(10))
            expect(result === option)
        })

        it('filter: should return None when condition is not met', () => {
            const filtered = option.filter(value => value < 3)
            expect(filtered === None)
        })

        it('filter: should return itself when condition is met', () => {
            const filtered = option.filter(value => value > 3)
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
            const result = option.match(
                () => "No value found",
                () => "This shouldn't run"
            )
            expect(result).toBe("No value found")
        })

        it('getValueOrDefault: should return default value', () => {
            const result = option.getValueOrDefault("Default")
            expect(result).toBe("Default")
        })

        it('getValueOrCompute: should return computed value', () => {
            const result = option.getValueOrCompute(() => "Computed")
            expect(result).toBe("Computed")
        })

        it('mapOrDefault: should return default value', () => {
            const result = option.mapOrDefault(v => v, "Default")
            expect(result).toBe("Default")
        })

        it('mapOrCompute: should return computed value', () => {
            const result = option.mapOrCompute(v => v, () => "Computed")
            expect(result).toBe("Computed")
        })

        it('or: should return provided option', () => {
            const other = Some(10)
            const result = option.or(other)
            expect(result === other)
        })

        it('orElse: should return result of provided function', () => {
            const other = Some(10)
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
