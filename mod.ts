import * as fs from "@std/fs";

/**
 * Options
 */
export interface Options {
  /** write documents to FILE */
  outputDocument?: string;
  /** Proxy, Certificate, etc(require `--unstable` option) */
  client?: Deno.CreateHttpClientOptions;
}

/**
 * Result
 */
export interface Result {
  response?: Response;
  outputDocument?: string;
}

/**
 * wget
 *
 * @param url
 * @param options
 * @returns Response
 */
export async function wget(
  url: string,
  options?: Options,
): Promise<Result> {
  const init = options?.client
    ? { client: Deno.createHttpClient(options.client) }
    : undefined;
  const response = await fetch(url, init);

  let outputDocument = options?.outputDocument?.trim();
  if (!outputDocument) {
    // response.headers.get("Content-Disposition") // TODO
    const array = new URL(url).pathname.split("/");
    outputDocument = array[array.length - 1].trim();
    if (!outputDocument) {
      outputDocument = "index.html";
    }
  }

  const original = outputDocument;
  for (let i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
    if (!fs.existsSync(outputDocument)) {
      break;
    }
    outputDocument = `${original}.${i}`;
  }

  const f = Deno.createSync(outputDocument);
  await response.body?.pipeTo(f.writable);
  return { response, outputDocument };
}
