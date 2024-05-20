import {getAddr} from './../config/index'

async function require(
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

export default require
