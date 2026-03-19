import { useQuery } from "@tanstack/react-query";
import { api } from "../utility/api";

const useProducts = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.get('/products').then(r => r.data),
  })

  return {
    products: data?.products,
    error,
    isLoading: isPending,
  };
};

export default useProducts;