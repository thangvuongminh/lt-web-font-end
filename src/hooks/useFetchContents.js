import { useMutation, useQuery } from "react-query";
import { QUERY_KEY } from "@/config/queryConfig";
import instance from "@/config/axiosConfig";

export const useFetchContents = () => {
  return useMutation({
    mutationFn: ({ contentSearch, page }) => {
      if (page === undefined) {
        return instance.post("/contents/search", {
          ...contentSearch,
        });
      }
      return instance.post("/contents/search", {
        ...contentSearch,
        ...page,
      });
    },
  });
};
