import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
const createBlock = async ({ contentId, ...body }) => {
  const { data } = await instance.post(`/contents/${contentId}/blocks`, body, {
    isPublic: false,
  });
  return data;
};
const useCreateBlock = (contentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => createBlock({ contentId, ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.getContentDetail(contentId),
      });
    },
  });
};

export default useCreateBlock;
