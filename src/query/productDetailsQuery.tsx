import { useQuery } from "@tanstack/react-query";
import { api } from "../utility/api";
import type { Product, ProductDetailsParams, UseProductDetailsReturn } from "../types";

const useProductDetails = (params?: ProductDetailsParams): UseProductDetailsReturn => {
  const { data, isPending, error } = useQuery<Product>({
    queryKey: ['productDetails', params],
    queryFn: () => {
      return api.get<Product>(`/products/${params?.id}`).then(r => r.data);
    },
  })

  return {
    productDetails: data,
    error: error as Error | null,
    isLoading: isPending,
  };
};

export default useProductDetails;