import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { store } from "@/store/store";
import { use } from "react";
import { useQuery } from "react-query";

export const useGetBlockDetail = (contentId, blockId) => {
  const isAuthenticate = store.getState((state) => state.auth.isAuthenticate);

  return useQuery({
    queryKey: QUERY_KEY.getBlockDetail(contentId, blockId),
    queryFn: async () => {
      return await instance.get(`/contents/${contentId}/blocks/${blockId}`, {
        isPublic: !isAuthenticate,
      });
    },
    enabled: !!blockId && !!contentId,
  });
};
