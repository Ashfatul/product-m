import { createBrowserRouter } from "react-router";
import ProductList from "../components/ProductList/ProductList";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { Suspense } from "react";
import BaseLayout from "../layout/BaseLayout";
import Home from "../components/Home/Home";
import HomeSkeleton from "../components/Skeletons/HomeSkeleton";
import ProductListSkeleton from "../components/Skeletons/ProductListSkeleton";
import ProductDetailsSkeleton from "../components/Skeletons/ProductDetailsSkeleton";

export const Route = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout/>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<HomeSkeleton />}><Home /></Suspense>,
      },
      {
        path: "/products",
        element: <Suspense fallback={<ProductListSkeleton />}><ProductList /></Suspense>,
      },
      {
        path: "/products/:id",
        element: <Suspense fallback={<ProductDetailsSkeleton />}><ProductDetails /></Suspense>,
      }, 
    ]
  },
  // {
  //   path: "*",
  //   element: <ErrorBoundary />
  // }
]);