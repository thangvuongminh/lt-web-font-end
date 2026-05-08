import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetWithdrawalRequests = (page) => {
  return useQuery({
    queryKey: QUERY_KEY.getMyWithdraw(page),
    queryFn: () =>
      instance.get(
        "/withdrawal/my-requests",
        {
          params: {
            page,
            limit: 10,
            sort: "createdAt,DESC",
          },
        },
        { isPublic: false },
      ),
  });
};
