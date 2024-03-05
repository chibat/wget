// import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts";
import { wget } from "./mod.ts";

Deno.test(async function wgetTest() {
  await wget("https://deno.land/logo.svg");
  await Deno.remove("logo.svg");
});

Deno.test(async function wgetFileNameTest() {
  await wget("https://deno.land/logo.svg", { fileName: "foo.svg" });
  await Deno.remove("foo.svg");
});
