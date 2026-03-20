import { useQuery } from "@tanstack/react-query";
import { api } from "../utility/api";

const useProducts = (params?: any) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['productsCategory', params],
    queryFn: () =>  api.get('/products/categories').then(r => r.data)
  })  

  return {
    category: data,
    error,
    isLoading: isPending,
  };
};

export default useProducts;