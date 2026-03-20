import { useQuery } from "@tanstack/react-query";
import { api } from "../utility/api";
import type { ProductQueryParams, ProductApiResponse, UseProductsReturn } from "../types";

const getEndpoint = (params?: ProductQueryParams): string => {
  switch (params?.filter) {
    case 'search':
      return '/products/search';
    case 'category':
      return `/products/category/${params.category}`;
    default:
      return '/products';
  }
}

const useProducts = (params?: ProductQueryParams): UseProductsReturn => {
  const { data, isPending, error } = useQuery<ProductApiResponse>({
    queryKey: ['products', params],
    queryFn: () => {
      const { filter, category, ...actualParams } = params || {};
      return api.get<ProductApiResponse>(getEndpoint(params), { params: actualParams }).then(r => r.data);
    },
  })

  return {
    products: data?.products,
    total: data?.total,
    error: error as Error | null,
    isLoading: isPending,
  };
};

export default useProducts;