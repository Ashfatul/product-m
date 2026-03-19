import { createBrowserRouter } from "react-router";
import ProductList from "../components/ProductList/ProductList";
import Home from "../components/Home/Home";

export const Route = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/:id",
    element: <div>Product Details</div>,
  }
]);