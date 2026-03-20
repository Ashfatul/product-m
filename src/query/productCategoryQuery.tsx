import { useQuery } from "@tanstack/react-query";
import { api } from "../utility/api";
import type { UseProductsCategoryReturn } from "../types";

const useProductsCategory = (): UseProductsCategoryReturn => {
  const { data, isPending, error } = useQuery<string[]>({
    queryKey: ['productsCategory'],
    queryFn: () =>  api.get<string[]>('/products/categories').then(r => r.data)
  })  

  return {
    category: data,
    error: error as Error | null,
    isLoading: isPending,
  };
};

export default useProductsCategory;