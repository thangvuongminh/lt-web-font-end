import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useMutation, useQuery, useQueryClient } from "react-query";
export const usePaymentConfirm = () => {
  return useMutation({
    mutationFn: (params) => {
      return instance.post("/api/v1/payment-confirm", params, {
        isPublic: false,
      });
    },
  });
};
