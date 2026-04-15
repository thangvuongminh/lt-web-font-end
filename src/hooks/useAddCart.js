import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const useAddCart = () => {
  return useMutation({
    mutationFn: (contentId) => {
      return instance.post("/contents/add/cart", { contentId: contentId });
    },
  });
};
