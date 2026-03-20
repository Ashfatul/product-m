import { createBrowserRouter } from "react-router";
import ProductList from "../components/ProductList/ProductList";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { Suspense } from "react";
import BaseLayout from "../layout/BaseLayout";

export const Route = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout/>,
    children: [
      {
        path: "/products",
        element: <Suspense fallback="Loading..."><ProductList /></Suspense>,
      },
      {
        path: "/products/:id",
        element: <Suspense fallback="Loading..."><ProductDetails /></Suspense>,
      }, 
    ]
  },
  // {
  //   path: "*",
  //   element: <ErrorBoundary />
  // }
]);