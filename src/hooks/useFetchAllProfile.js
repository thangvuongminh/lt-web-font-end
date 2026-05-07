import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useQuery } from "react-query";

export const useFetchAllProfile = (nickname) =>
  useQuery({
    queryKey: [QUERY_KEY.getProfile(nickname)],
    queryFn: async () => {
      return await instance.get(`/profile/nickname/${nickname}`);
    },
    enabled: !!nickname && nickname !== "update",
  });
