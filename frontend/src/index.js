import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Products from './components/Products';
import Errorpage from './config/Errorpage'
import ProductFilters from './components/ProductFilters';



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
      },
      {
        path: 'filters',
        element: <ProductFilters />
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();
