import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useQuery } from "react-query";

export const useFetchAllCategory = () =>
  useQuery({
    queryKey: QUERY_KEY.getAllCategory(),
    queryFn: async () => {
      return (await instance.get("/categories/getAll"))?.data?.data;
    },
  });
