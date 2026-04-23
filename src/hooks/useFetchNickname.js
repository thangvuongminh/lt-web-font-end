import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useQuery } from "react-query";

export const useFetchNickname = () =>
  useQuery({
    queryKey: QUERY_KEY.getNickname,
    queryFn: async () => {
      return await instance.get("/profile/get/nickname", { isPublic: false });
    },
    enabled: false,
  });
