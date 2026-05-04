import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useMutation, useQueryClient } from "react-query";
const updateBlock = async ({ contentId, blockId, ...body }) => {
  const { data } = await instance.put(
    `/contents/${contentId}/blocks/${blockId}`,
    body,
    { isPublic: false },
  );
  return data;
};

const useUpdateBlock = (contentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blockId, ...body }) =>
      updateBlock({ contentId, blockId, ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.getContentDetail(contentId),
      });
    },
  });
};

export default useUpdateBlock;
