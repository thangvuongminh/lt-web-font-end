import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useMutation, useQuery } from "react-query";

export const useGetWithDrawalPending = () => {
  return useQuery({
    queryKey: QUERY_KEY.getAllWithdrawPending(),
    queryFn: async () => {
      return await instance.get("withdrawal/admin/pending", {
        isPublic: false,
      });
    },
  });
};
