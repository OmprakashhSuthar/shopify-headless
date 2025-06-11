import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Errorpage from "../routes/Errorpage";
import Products from "../routes/Products";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Errorpage />,
        children: [
            {
                index: true,
                element: <Products />
            },
            {
                path: 'products',
                element: <Products />
            }
        ]
    }
]);

export default router;