---

# `Option` Type for TypeScript

`Option` is a TypeScript utility that represents an optional value, which can either be `Some` with a value or `None`.

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
import { Some, None } from 'ts-option-type';

const maybeValue: Option<number> = Some(5);

const result = maybeValue.match(
    () => "No value found",
    (value) => `Value is: ${value}`
);

console.log(result);  // Outputs: "Value is: 5"
```

### 2. Handling Defaults

```typescript
const noValue: Option<string> = None;

console.log(noValue.getValueOrDefault("Default String"));  // Outputs: "Default String"
```

### 3. Chaining Methods

```typescript
const initialValue: Option<number> = Some(4);

const transformedValue = initialValue
    .map(value => value * 2)
    .filter(value => value > 5);

console.log(transformedValue.isSome);  // Outputs: true
```

### 4. Computation Fallbacks

```typescript
const emptyValue: Option<string> = None;

const result = emptyValue.getValueOrCompute(() => "Computed Value");

console.log(result);  // Outputs: "Computed Value"
```

### 5. Combining Multiple Options

```typescript
const first: Option<number> = Some(1);
const second: Option<number> = Some(2);

const combined = first.and(second);

console.log(combined.isSome);  // Outputs: true
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---