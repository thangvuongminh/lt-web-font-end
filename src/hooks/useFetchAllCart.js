import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useQuery } from "react-query";

export const useFetchAllCart = () =>
  useQuery({
    queryKey: [QUERY_KEY.getAllCarts()],
    queryFn: async () => {
      return await instance.get(`/contents/cart`);
    },
  });
