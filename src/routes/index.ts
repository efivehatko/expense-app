import home from './home/index'
import graphs from './graphs/index'

const routes: {
    name: string
    path: string
    routeComponent: JSX.Element
}[] = [home, graphs]

export default routes
