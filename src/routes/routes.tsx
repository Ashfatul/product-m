import { createBrowserRouter } from "react-router";
import ProductList from "../components/ProductList/ProductList";

export const Route = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />,
  },
]);