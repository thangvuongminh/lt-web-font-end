import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { useMutation, useQueryClient } from "react-query";

const deleteBlock = async ({ contentId, blockId }) => {
  const { data } = await instance.delete(
    `/contents/${contentId}/blocks/${blockId}`,
    { isPublic: false },
  );
  return data;
};

const useDeleteBlock = (contentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blockId }) => deleteBlock({ contentId, blockId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.getContentDetail(contentId),
      });
    },
  });
};

export default useDeleteBlock;
