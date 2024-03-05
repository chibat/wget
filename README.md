# wget

File download

## Usage

```
$ deno add @chiba/wget
```

```ts
import { wget } from "@chiba/wget";

await wget("https://deno.land/logo.svg");
```

### CLI

```
$ deno run jsr:@chiba/wget https://deno.land/logo.svg
```

### REPL

```
$ deno
> import {wget} from "jsr:@chiba/wget"
undefined
> await wget("https://deno.land/logo.svg");
Response {
  body: ReadableStream { locked: false },
  bodyUsed: true,
  headers: Headers { .... },
  ok: true,
  redirected: false,
  status: 200,
  statusText: "OK",
  url: "https://deno.land/logo.svg"
}
>
$ ls
logo.svg
```



