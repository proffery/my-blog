export const getData = async <T, D extends null | object>(
  endpoint: string,
  options: {
    body?: D | null | undefined
    cache?: 'force-cache' | 'no-store'
    method?: 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT'
    revalidate?: 0 | false | number
  } = {}
): Promise<T | null> => {
  const { body, cache, method = 'GET', revalidate } = options

  try {
    const response = await fetch(endpoint, {
      body: body ? JSON.stringify(body) : undefined,
      cache,
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
