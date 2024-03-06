import * as fs from "@std/fs";

/**
 * wget
 *
 * @param url
 * @param options
 * @returns Response
 */
export async function wget(
  url: string,
  options?: { file?: string },
): Promise<{response: Response, file: string} | null> {
  const response = await fetch(url);

  let file = options?.file?.trim();
  if (!file) {
    // response.headers.get("Content-Disposition") // TODO
    const array = new URL(url).pathname.split("/");
    file = array[array.length - 1].trim();
    if (!file) {
      file = "index.html";
    }
  }

  const original = file;
  for (let i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
    if (!fs.existsSync(file)) {
      break;
    }
    file = `${original}.${i}`;
  }

  const f = Deno.createSync(file);
  await response.body?.pipeTo(f.writable);
  return {response, file};
}

if (import.meta.main) {
  const url = Deno.args[0];
  const file = Deno.args[1];
  if (url) {
    await wget(url, { file });
  }
}
