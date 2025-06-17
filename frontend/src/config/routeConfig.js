import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Errorpage from "../pages/Errorpage";
import ProductDetails from "../pages/ProductDetail";
import Products from "../pages/Products";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Errorpage />,
        children: [
            {
                path: 'collections/:id',
                element: <Products />
            },
            {
                path: 'product/:id',
                element: <ProductDetails />
            }
        ]
    }
]);

export default router;