/**
 * wget
 *
 * @param url
 * @param options
 * @returns Request
 */
export async function wget(
  url: string,
  options?: { file?: string },
): Promise<Response | null> {
  let file = options?.file?.trim();
  if (!file) {
    // res.headers.get("Content-Disposition") // TODO
    const array = new URL(url).pathname.split("/");
    file = array[array.length - 1].trim();
    if (!file) {
      file = "index.html";
    }
  }
  const res = await fetch(url);
  const f = Deno.createSync(file);
  await res.body?.pipeTo(f.writable);
  return res;
}

if (import.meta.main) {
  const url = Deno.args[0];
  const file = Deno.args[1];
  if (url) {
    await wget(url, { file });
  }
}
