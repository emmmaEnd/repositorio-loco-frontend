import { createBrowserRouter }from 'react-router-dom'
import Layout from './layouts/Layout'
import NewProduct,{ action as NewProductAction} from './views/NewProduct'
import Products, {loader as productsLoader, action as updateAvailability } from './views/Products'
import EditProduct, {loader as EditProductLoader, action as EditProductAction} from './views/EditProduct'
import { action as DeleteProductAction } from './components/ProductDetails'



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: updateAvailability
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: NewProductAction
            },
            {
                path: 'productos/:id/editar', //ROA Pattern
                element: <EditProduct/>,
                loader: EditProductLoader,
                action: EditProductAction
            },
            {
                path: 'productos/:id/eliminar',
                action: DeleteProductAction

            }
            
        ]
    }
    
])