import { ComponentType } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/services/store'

const withRedux = <T,>(WrappedComponent: ComponentType<T>) => {
  const ComponentWithRedux = (props: T & any) => {
    return (
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    )
  }

  return ComponentWithRedux
}

export default withRedux
