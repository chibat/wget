/**
 * wget
 *
 * @param url
 * @param options
 * @returns Request
 */
export async function wget(
  url: string,
  options?: { fileName?: string },
): Promise<Response | null> {
  let fileName = options?.fileName?.trim();
  const res = await fetch(url);
  if (!fileName) {
    // res.headers.get("Content-Disposition") // TODO
    const array = new URL(url).pathname.split("/");
    fileName = array[array.length - 1].trim();
    if (!fileName) {
      return res;
    }
  }
  const file = Deno.createSync(fileName);
  await res.body?.pipeTo(file.writable);
  return res;
}

if (import.meta.main) {
  const url = Deno.args[0];
  const fileName = Deno.args[1];
  if (url) {
    await wget(url, { fileName });
  }
}
