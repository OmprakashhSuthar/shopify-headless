import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Errorpage from "../pages/Errorpage";
import ProductDetails from "../pages/ProductDetail";
import Products from "../pages/Products";
import SearchSuggestionsPage from "../pages/SearchSuggestionsPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Account from "../pages/Account";

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
                path: 'products/:id',
                element: <ProductDetails />
            },
            {
                path: 'search/:q',
                element: <SearchSuggestionsPage />
            },
            {
                path: 'account',
                element: <Account />,
                children: [
                    {
                        path: 'signup',
                        element: <SignUp />
                    },
                    {
                        path: 'login',
                        element: <Login />
                    },
                ]
            }
        ]
    }
]);

export default router;