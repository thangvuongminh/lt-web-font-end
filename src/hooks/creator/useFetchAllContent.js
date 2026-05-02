import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useQuery } from "react-query";

export const useFetchAllContent = () =>
  useQuery({
    queryKey: QUERY_KEY.getAllContentByCreator(),
    queryFn: async () => {
      return await instance.get("/contents/all/create/me", {
        isPublic: false,
      });
    },
  });
