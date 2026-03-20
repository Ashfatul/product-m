import { useQuery } from "@tanstack/react-query";
import { api } from "../utility/api";

const useProductDetails = (params?: any) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['productDetails', params],
    queryFn: () => {
      return api.get(`/products/${params.id}`).then(r => r.data);
    },
  })

  return {
    productDetails: data,
    error,
    isLoading: isPending,
  };
};

export default useProductDetails;