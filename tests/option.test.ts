import { Some, None } from "../index"

describe('Option', () => {

    describe('Some', () => {
        const wrappedValue = 0
            , otherValue = 1
            , option = Some(wrappedValue)

        describe('match', () => {
            it('should return the "Some" value', () => {
                const result = option.match(value => value, () => otherValue)
                expect(result).toBe(wrappedValue)
            })
        })

        describe('getValueOrDefault', () => {
            it('should return the contained value', () => {
                const result = option.getValueOrDefault(otherValue)
                expect(result).toBe(wrappedValue)
            })
        })

        describe('getValueOrCompute', () => {
            it('should return the contained value', () => {
                const result = option.getValueOrCompute(() => otherValue)
                expect(result).toBe(wrappedValue)
            })
        })

        describe('mapOrDefault', () => {
            it('should map the value', () => {
                const result = option.mapOrDefault(v => v.toString(), otherValue.toString())
                expect(result).toBe(wrappedValue.toString())
            })
        })

        describe('mapOrCompute', () => {
            it('should map the value', () => {
                const result = option.mapOrCompute(v => v.toString(), () => otherValue.toString())
                expect(result).toBe(wrappedValue.toString())
            })
        })

        describe('map', () => {
            it('should correctly transform the value', () => {
                const result = option.map(value => value.toString())
                expect(result.match(v => v, () => otherValue.toString())).toBe(wrappedValue.toString())
            })
        })     

        describe('and', () => {
            it('should return the provided option', () => {
                const other = Some(0)
                const combined = option.and(other)
                expect(combined).toBe(other)
            })
        })

        describe('andThen', () => {
            it('should return the result of the provided function', () => {
                const other = Some(0)
                const result = option.andThen(() => other)
                expect(result).toBe(other)
            })
        })

        describe('or', () => {
            it('should return itself', () => {
                const other = Some(0)
                const result = option.or(other)
                expect(result).toBe(option)
            })
        })

        describe('orElse', () => {
            it('should return itself', () => {
                const other = Some(0)
                const result = option.orElse(() => other)
                expect(result).toBe(option)
            })
        })

        describe('filter', () => {
            it('should return None when condition is not met', () => {
                const filtered = option.filter(value => value === otherValue)
                expect(filtered).toBe(None)
            })

            it('should return itself when condition is met', () => {
                const filtered = option.filter(value => value === wrappedValue)
                expect(filtered).toBe(option)
            })
        })

        describe('isNone', () => {
            it('should return false', () => {
                expect(option.isNone).toBe(false)
            })
        })

        describe('isSome', () => {
            it('should return true', () => {
                expect(option.isSome).toBe(true)
            })
        })
    })

    describe('None', () => {
        const option = None

        describe('match', () => {
            it('should return the "None" value', () => {
                const expected = "No value found"
                const result = option.match(_ => "This shouldn't run", () => expected)
                expect(result).toBe(expected)
            })
        })

        describe('getValueOrDefault', () => {
            it('should return the default value', () => {
                const expected = "Default"
                const result = option.getValueOrDefault(expected)
                expect(result).toBe(expected)
            })
        })

        describe('getValueOrCompute', () => {
            it('should return the computed value', () => {
                const expected = "Computed"
                const result = option.getValueOrCompute(() => expected)
                expect(result).toBe(expected)
            })
        })

        describe('mapOrDefault', () => {
            it('should return the default value', () => {
                const expected = "Default"
                const result = option.mapOrDefault(v => v, expected)
                expect(result).toBe(expected)
            })
        })

        describe('mapOrCompute', () => {
            it('should return the computed value', () => {
                const expected = "Computed"
                const result = option.mapOrCompute(v => v, () => expected)
                expect(result).toBe(expected)
            })
        })

        describe('map', () => {
            it('should return None', () => {
                const result = option.map(_ => _)
                expect(result).toBe(None)
            })
        })     

        describe('and', () => {
            it('should return None', () => {
                const other = Some(0)
                const combined = option.and(other)
                expect(combined).toBe(None)
            })
        })

        describe('andThen', () => {
            it('should return None', () => {
                const other = Some(0)
                const result = option.andThen(() => other)
                expect(result).toBe(None)
            })
        })

        describe('or', () => {
            it('should return the provided option', () => {
                const other = Some(0)
                const result = option.or(other)
                expect(result).toBe(other)
            })
        })

        describe('orElse', () => {
            it('should return the result of the provided function', () => {
                const other = Some(0)
                const result = option.orElse(() => other)
                expect(result).toBe(other)
            })
        })

        describe('filter', () => {
            it('should always return None', () => {
                const filtered = option.filter(_ => true)
                expect(filtered).toBe(None)
            })
        })

        describe('isNone', () => {
            it('should return true', () => {
                expect(option.isNone).toBe(true)
            })
        })

        describe('isSome', () => {
            it('should return false', () => {
                expect(option.isSome).toBe(false)
            })
        })
    })    
})