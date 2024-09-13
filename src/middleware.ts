import { isUserMiddleware } from '@/middlewares/is-user-middleware'
import { stackMiddlewares } from '@/middlewares/stack-handler'

const middlewares = [isUserMiddleware]

export default stackMiddlewares(middlewares)
