# vitest-localstorage-mock

Auto mock `localstorage` and `sessionstorage` in your [Vitest](https://vitest.dev/) scripts for testing.

[![npm version](https://badgen.net/npm/v/vitest-localstorage-mock)](https://npm.im/vitest-localstorage-mock) [![npm downloads](https://badgen.net/npm/dm/vitest-localstorage-mock)](https://npm.im/vitest-localstorage-mock) ![actions status](https://github.com/Mitscherlich/vitest-localstorage-mock/actions/workflows/ci.yml/badge.svg?branch=dev)

## Install

via `pnpm`, `yarn` or `npm`:

```bash
pnpm add -D vitest-localstorage-mock
# or
yarn add -D vitest-localstorage-mock
# or
npm install -D vitest-localstorage-mock
```

## Setup

### Module

In your `vite.config.(js|ts)` under the `test` [configuration section](https://vitest.dev/config/#options) create a `setupFiles` array and add `vitest-localstorage-mock` to the array. ~~Also, ensure you have enabled [`globals`](https://vitest.dev/config/#globals)~~ We don't need globals any more.

```js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['vitest-localstorage-mock'],
    mockReset: false,
  }
})
```

### Setup file

Alternatively you can create a new setup file which then requires this module or
add the `require` statement to an existing setup file.

- `__setups__/localstorage.js`

```js
import 'vitest-localstorage-mock'
```

Add that file to your `setupFiles` array:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['./__setups__/localstorage.js'],
    mockReset: false,
  }
})
```

## License

MIT &copy; [Mitscherlich](https://mitscherlich.me)
