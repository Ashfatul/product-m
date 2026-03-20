import { useQuery } from "@tanstack/react-query";
import { api } from "../utility/api";

const getEndpoint = (params: any) => {
  switch (params?.filter) {
    case 'search':
      return '/products/search';
    case 'category':
      return '/products/category';
    default:
      return '/products';
  }
}

const useProducts = (params?: any) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['products', params],
    queryFn: () => {
      const { filter, ...actualParams } = params;
      return api.get(getEndpoint(params), { params: actualParams }).then(r => r.data);
    },
  })

  return {
    products: data?.products,
    total: data?.total,
    error,
    isLoading: isPending,
  };
};

export default useProducts;