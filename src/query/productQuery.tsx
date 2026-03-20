import { useQuery } from "@tanstack/react-query";
import { api } from "../utility/api";

const useProducts = (params?: any) => {
  console.log('Fetching products with params:', params);
  const { data, isPending, error } = useQuery({
    queryKey: ['products', params],
    queryFn: () => api.get('/products', { params }).then(r => r.data),
  })

  return {
    products: data?.products,
    total: data?.total,
    error,
    isLoading: isPending,
  };
};

export default useProducts;