import { ComponentType, Suspense } from 'react'

const withSuspense = <T,>(WrappedComponent: ComponentType<T>) => {
  const ComponentWithSuspense = (props: T & any) => {
    return (
      <Suspense>
        <WrappedComponent {...props} />
      </Suspense>
    )
  }

  return ComponentWithSuspense
}

export default withSuspense
