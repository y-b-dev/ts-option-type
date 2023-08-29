import { Some, None } from "../index"

describe('Option', () => {

    describe('Some', () => {

        describe('match', () => {
            it('should return the "Some" value', () => {
                // Arrange
                const wrappedValue = 0
                    , option = Some(wrappedValue)

                // Act
                const result = option.match(value => value, () => wrappedValue + 1)

                // Assert
                expect(result).toBe(wrappedValue)
            })
        })

        describe('getValueOrDefault', () => {
            it('should return the contained value', () => {
                // Arrange
                const wrappedValue = 0
                    , option = Some(wrappedValue)

                // Act
                const result = option.getValueOrDefault(wrappedValue + 1)

                // Assert
                expect(result).toBe(wrappedValue)
            })
        })

        describe('getValueOrCompute', () => {
            it('should return the contained value', () => {
                // Arrange
                const wrappedValue = 0
                    , option = Some(wrappedValue)

                // Act
                const result = option.getValueOrCompute(() => wrappedValue + 1)

                // Assert                
                expect(result).toBe(wrappedValue)
            })
        })

        describe('mapOrDefault', () => {
            it('should map the value', () => {
                // Arrange
                const wrappedValue = 0
                    , option = Some(wrappedValue)

                // Act
                const result = option.mapOrDefault(v => v.toString(), (wrappedValue + 1).toString())

                // Assert
                expect(result).toBe(wrappedValue.toString())
            })
        })

        describe('mapOrCompute', () => {
            it('should map the value', () => {
                // Arrange
                const wrappedValue = 0
                    , option = Some(wrappedValue)

                // Act
                const result = option.mapOrCompute(v => v.toString(), () => (wrappedValue + 1).toString())

                // Assert
                expect(result).toBe(wrappedValue.toString())
            })
        })

        describe('map', () => {
            it('should correctly transform the value', () => {
                // Arrange
                const wrappedValue = 0
                    , otherValue = wrappedValue + 1
                    , option = Some(wrappedValue)

                // Act
                const result = option.map(value => value.toString())

                // Assert
                expect(result.match(v => v, () => otherValue.toString())).toBe(wrappedValue.toString())
            })
        })

        describe('and', () => {
            it('should return the provided option', () => {
                // Arrange
                const wrappedValue = 0
                    , option = Some(wrappedValue)
                    , other = Some(wrappedValue)

                // Act
                const combined = option.and(other)

                // Assert
                expect(combined).toBe(other)
            })
        })

        describe('andThen', () => {
            it('should return the result of the provided function', () => {
                // Arrange
                const wrappedValue = 0
                    , option = Some(wrappedValue)
                    , other = Some(wrappedValue)

                // Act
                const result = option.andThen(() => other)

                // Assert
                expect(result).toBe(other)
            })
        })

        describe('or', () => {
            it('should return itself', () => {
                // Arrange
                const wrappedValue = 0
                    , option = Some(wrappedValue)
                    , other = Some(wrappedValue)

                // Act
                const result = option.or(other)

                // Assert
                expect(result).toBe(option)
            })
        })

        describe('orElse', () => {
            it('should return itself', () => {
                // Arrange
                const wrappedValue = 0
                    , option = Some(wrappedValue)
                    , other = Some(wrappedValue)

                // Act
                const result = option.orElse(() => other)

                // Assert
                expect(result).toBe(option)
            })
        })

        describe('filter', () => {
            it('should return None when condition is not met', () => {
                // Arrange
                const option = Some(0)

                // Act
                const filtered = option.filter(_ => false)

                // Assert
                expect(filtered).toBe(None)
            })

            it('should return itself when condition is met', () => {
                // Arrange
                const option = Some(0)

                // Act
                const filtered = option.filter(_ => true)

                // Assert
                expect(filtered).toBe(option)
            })
        })

        describe('isNone', () => {
            it('should return false', () => {
                // Arrange
                const option = Some(0)

                // Act & Assert
                expect(option.isNone).toBe(false)
            })
        })

        describe('isSome', () => {
            it('should return true', () => {
                // Arrange
                const option = Some(0)

                // Act & Assert
                expect(option.isSome).toBe(true)
            })
        })
    })

    describe('None', () => {

        describe('match', () => {
            it('should return the "None" value', () => {
                // Arrange
                const option = None
                    , expected = "No value found"

                // Act
                const result = option.match(_ => "This shouldn't run", () => expected)

                // Assert
                expect(result).toBe(expected)
            })
        })

        describe('getValueOrDefault', () => {
            it('should return the default value', () => {
                // Arrange
                const option = None
                    , expected = "Default"

                // Act
                const result = option.getValueOrDefault(expected)

                // Assert
                expect(result).toBe(expected)
            })
        })

        describe('getValueOrCompute', () => {
            it('should return the computed value', () => {
                // Arrange
                const option = None
                    , expected = "Computed"

                // Act
                const result = option.getValueOrCompute(() => expected)

                // Assert
                expect(result).toBe(expected)
            })
        })

        describe('mapOrDefault', () => {
            it('should return the default value', () => {
                // Arrange
                const option = None
                    , expected = "Default"

                // Act
                const result = option.mapOrDefault(v => v, expected)

                // Assert
                expect(result).toBe(expected)
            })
        })

        describe('mapOrCompute', () => {
            it('should return the computed value', () => {
                // Arrange
                const option = None
                    , expected = "Computed"

                // Act
                const result = option.mapOrCompute(v => v, () => expected)

                // Assert
                expect(result).toBe(expected)
            })
        })

        describe('map', () => {
            it('should return None', () => {
                // Arrange
                const option = None

                // Act
                const result = option.map(_ => _)

                // Assert
                expect(result).toBe(None)
            })
        })

        describe('and', () => {
            it('should return None', () => {
                // Arrange
                const option = None
                    , other = Some(0)

                // Act
                const combined = option.and(other)

                // Assert
                expect(combined).toBe(None)
            })
        })

        describe('andThen', () => {
            it('should return None', () => {
                // Arrange
                const option = None
                    , other = Some(0)

                // Act
                const result = option.andThen(() => other)

                // Assert
                expect(result).toBe(None)
            })
        })

        describe('or', () => {
            it('should return the provided option', () => {
                // Arrange
                const option = None
                    , other = Some(0)

                // Act
                const result = option.or(other)

                // Assert
                expect(result).toBe(other)
            })
        })

        describe('orElse', () => {
            it('should return the result of the provided function', () => {
                // Arrange
                const option = None
                    , other = Some(0)

                // Act
                const result = option.orElse(() => other)

                // Assert
                expect(result).toBe(other)
            })
        })

        describe('filter', () => {
            it.each([true, false])('should always return None', val => {
                // Arrange
                const option = None

                // Act                
                const filtered = option.filter(_ => val)

                // Assert
                expect(filtered).toBe(None)
            })
        })

        describe('isNone', () => {
            it('should return true', () => {
                // Arrange
                const option = None

                // Act & Assert
                expect(option.isNone).toBe(true)
            })
        })

        describe('isSome', () => {
            it('should return false', () => {
                // Arrange
                const option = None

                // Act & Assert
                expect(option.isSome).toBe(false)
            })
        })
    })
})