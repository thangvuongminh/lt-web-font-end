import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { store } from "@/store/store";
import { useQuery } from "react-query";

export const useGetCourseDetail = (contentId) => {
  const isAuthenticated = store.getState((state) => state.auth.isAuthenticate);
  return useQuery({
    queryKey: QUERY_KEY.getContentDetail(contentId),
    queryFn: async () => {
      return await instance.get(`/contents/${contentId}/detail`, {
        isPublic: isAuthenticated,
      });
    },
  });
};
