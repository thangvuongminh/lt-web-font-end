import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useQuery } from "react-query";

export const useFetchAllProfile = () =>
  useQuery({
    queryKey: [QUERY_KEY.getProfile],
    queryFn: async () => {
      return await instance.get(`/profile/get`, { isPublic: false });
    },
  });
