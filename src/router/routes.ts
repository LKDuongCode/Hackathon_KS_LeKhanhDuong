import { categoriesRoute } from './routers/categories'
import { dashboardRoute } from './routers/dashboard'
import { productsRoute } from './routers/products'

export const routes = [...dashboardRoute, ...categoriesRoute, ...productsRoute]
