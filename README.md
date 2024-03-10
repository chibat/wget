# wget

[![JSR](https://jsr.io/badges/@chiba/wget?a)](https://jsr.io/@chiba/wget)
[![JSR Score](https://jsr.io/badges/@chiba/wget/score)](https://jsr.io/@chiba/wget)

File download

## Usage

### API

```
$ deno add @chiba/wget
```

```ts
import { wget } from "@chiba/wget";

await wget("https://deno.land/logo.svg");
```

### CLI

```
$ deno run jsr:@chiba/wget/cli https://deno.land/logo.svg
```

### REPL

```
$ deno
> import {wget} from "jsr:@chiba/wget"
undefined
> await wget("https://deno.land/logo.svg");
{
  response: Response {
    body: ReadableStream { locked: false },
    bodyUsed: true,
    headers: Headers { ... },
    ok: true,
    redirected: false,
    status: 200,
    statusText: "OK",
    url: "https://deno.land/logo.svg"
  },
  outputDocument: "logo.svg"
}
>
$ ls
logo.svg
```



