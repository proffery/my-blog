import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useQueryParam<T extends boolean | number | string>(
  paramKey: string,
  defaultValue?: T
): [T | null, (value: T | null) => void] {
  const searchParams = useSearchParams()
  const existParams = new URLSearchParams(searchParams)

  const pathname = usePathname()
  const { replace } = useRouter()

  const paramValue = searchParams.get(paramKey)
  const convertedValue = getConvertedValue<T>(paramValue, defaultValue)

  function isNullish<T>(value: T | null | undefined): value is null | undefined {
    return value === null || value === undefined
  }

  const setParamValue = (value: T | null): void => {
    if (isNullish(value) || value === '') {
      existParams.delete(paramKey)
    } else {
      existParams.set(paramKey, String(value))
    }
    const queryString = existParams.toString()

    const path = queryString ? `${pathname}?` : pathname

    replace(path + existParams.toString())
  }

  return [convertedValue, setParamValue]
}

function getConvertedValue<T>(value: null | string, defaultValue: T | undefined): T | null {
  if (value === null) {
    return defaultValue ?? null
  }
  if (value === 'true' || value === 'false') {
    return (value === 'true') as unknown as T
  }
  if (!isNaN(Number(value))) {
    return Number(value) as unknown as T
  }

  return value as unknown as T
}
