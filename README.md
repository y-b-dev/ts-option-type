# `Option` Type for Typescript

`Option` is a TypeScript utility that represents an optional value, which can either be `Some` wrapping a value or `None`.

## Installation

Depending on your package manager, use one of the following commands:

### npm

```
npm install ts-option-type
```

### pnpm

```
pnpm add ts-option-type
```

### yarn

```
yarn add ts-option-type
```

## Tests

```
npm test
```

## Examples

### 1. Basic Usage

```typescript
import { Some, None } from 'ts-option-type'

const maybeValue: Option<number> = Some(5)

const result = maybeValue.match(
    (value) => `Value is: ${value}`,
    () => "No value found"
)

console.log(result)  // Outputs: "Value is: 5"
```

### 2. Handling Defaults

```typescript
const noValue: Option<string> = None

console.log(noValue.getValueOrDefault("Default String"))  // Outputs: "Default String"
```

### 3. Chaining Methods

```typescript
const initialValue: Option<number> = Some(4)

const transformedValue = initialValue
    .map(value => value * 2)
    .filter(value => value > 5)

console.log(transformedValue.isSome)  // Outputs: true
```

### 4. Computation Fallbacks

```typescript
const emptyValue: Option<string> = None

const result = emptyValue.getValueOrCompute(() => "Computed Value")

console.log(result)  // Outputs: "Computed Value"
```

### 5. Combining Multiple Options (set operations)

```typescript
const first: Option<number> = Some(1)
const second: Option<number> = Some(2)

const combined = first.and(second)

console.log(combined === second)  // Outputs: true

console.log(None.and(first) === None)  // Outputs: true

console.log(None.or(first) === first)  // Outputs: true
```

### 6. Creation Patterns

Create and manipulate `Option` types using different patterns to fit various scenarios:

```typescript
import { fromValue, fromValueConditional, fromNullable, fromUndefinable, createOptionFactory } from 'ts-option-type'

// 1. Convert any value to Option, treating null or undefined as None
const maybeValue = fromValue("Hello") // Some<string>

// 2. Convert a value to Option based on a custom condition
const condition = (value: string) => value.length === 0
const maybeStr = fromValueConditional("", condition) // None

// 3. Convert a possibly nullable object to Option
const nullObj: {} | null | undefined = null
const maybeObj = fromNullable(nullObj) // None - fromNullable(undefined) would have been Some!

// 4. Convert a possibly undefinable object to Option
const undefinedObj: {} | null | undefined = undefined
const maybeDef = fromUndefinable(undefinedObj) // None - fromUndefinable(null) would have been Some!

// 5. Create a custom Option factory using a predicate
const isNegative = (value: number) => value < 0
const naturalNumOptionFactory = createOptionFactory(isNegative)
const maybeNaturalNum = naturalNumOptionFactory(5) // Some<number>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
