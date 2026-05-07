import instance from "@/config/axiosConfig";
import { useMutation } from "react-query";

export const useDeposit = () => {
  return useMutation({
    mutationFn: (amount) => {
      return instance.post(
        "/api/v1/transactions/deposit",
        { total: amount },
        { isPublic: false },
      );
    },
  });
};
