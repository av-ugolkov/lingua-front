import { getAddr } from '../config'

async function asyncRequire(
  url: string,
  init?: RequestInit,
  queries?: Map<string, string>
): Promise<Response> {
  const fullUrl = new URL(getAddr() + url)
  if (queries) {
    queries.forEach((value, key) => {
      fullUrl.searchParams.append(key, value)
    })
  }
  return await fetch(fullUrl, init)
}

export default asyncRequire
