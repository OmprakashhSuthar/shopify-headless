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
                path: 'collections/:id',
                element: <Products />
            }
        ]
    }
]);

export default router;