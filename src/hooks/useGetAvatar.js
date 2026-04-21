import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useQuery } from "react-query";

export const useGetAvatar = () =>
  useQuery({
    queryKey: QUERY_KEY.getAvatar,
    queryFn: () => {
      return instance.get("/profile/get/avatar", {}, { isPublic: true });
    },
  });
