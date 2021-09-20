---
title: "TIL: Type alias augmentation in TypeScript"
date: 2021-09-20
description: Augmenting type aliases, even if it is not allowed, in TypeScript.
tagz:
  - TIL
  - typescript
  - type alias
  - augmentation
---

The first thing to remember is type alias augmentation is not allowed. This means we need to use *interface*s. I was trying to represent string literals using *interface*s but I failed as you guess.

After hours of fighting with TS, I finally found a [solution](https://github.com/microsoft/TypeScript/issues/28078#issuecomment-432339564) in GitHub.

It is hacky but works... Just make your type alias depends on *keyof SomeInterface*.

## Solution 1

This was the original solution from GitHub. It only supports index types since we use *keyof* operator.


**Declaration:**

```ts
// packages/core/store/locale/locale.types.ts

export const CHANGE_LOCALE = "CHANGE_LOCALE";

export interface LocaleRegistry {}
export type Locale = keyof LocaleRegistry; // keys of LocaleRegistry

export interface LocaleAction {
  type: typeof CHANGE_LOCALE;
  payload: Locale;
}

export type LocaleState = Locale;
```

**Augmentation:**

```ts
// apps/admin/src/@types/akdeniz-core.d.ts

import "@akdeniz/core";

declare module "@akdeniz/core" {
  export interface LocaleRegistry {
    // write here your string literals
    tr;
    en;
  }
}
```

## Solution 2

This one supports any type since we rely on values.

**Declaration:**

```ts
// packages/core/store/locale/locale.types.ts

export const CHANGE_LOCALE = "CHANGE_LOCALE";

export interface LocaleRegistry {}
export type Locale = LocaleRegistry[keyof LocaleRegistry]; // values of LocaleRegistry

export interface LocaleAction {
  type: typeof CHANGE_LOCALE;
  payload: Locale;
}

export type LocaleState = Locale;
```

**Augmentation:**

```ts
// apps/admin/src/@types/akdeniz-core.d.ts

import "@akdeniz/core";

declare module "@akdeniz/core" {
  export interface LocaleRegistry {
    // write here any type as value
    0: "tr";
    1: "en";
    2: number[];
    someRandomKey: Uint16Array;
  }
}
```

Or even better with helper interface *Registry*:



```ts
// packages/core/src/index.ts

// ...

export interface Registry<T> {
  readonly [n: number]: T;
}

// ...

```

```ts
// apps/admin/src/@types/akdeniz-core.d.ts

import { Registry } from "@akdeniz/core";

declare module "@akdeniz/core" {
  export interface LocaleRegistry extends Registry<"en" | "tr" | number[] | Uint16Array> {}
}
```