export const fetchWithTypes = async <T, D extends null | object>(
  endpoint: string,
  options: {
    body?: D
    cache?: 'force-cache' | 'no-store'
    headers?: HeadersInit
    method?: 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT'
    revalidate?: 0 | false | number
  } = {}
): Promise<T | null> => {
  const { body, cache, headers, method = 'GET', revalidate } = options

  try {
    const response = await fetch(endpoint, {
      body: body ? JSON.stringify(body) : undefined,
      cache,
      headers,
      method,
      next: { revalidate },
    })

    if (!response.ok) {
      throw new Error('Response was not ok')
    }

    return await response.json()
  } catch (reason) {
    if (reason instanceof Error) {
      console.error(reason.message)
    }

    return null
  }
}
