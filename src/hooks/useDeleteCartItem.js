import instance from "@/config/axiosConfig";
import axios from "axios";
import { useMutation } from "react-query";

export const useDeleteCartItem = () => {
  return useMutation({
    mutationFn: (contentId) => {
      return instance.delete(`/contents/${contentId}/delete/cart`);
    },
  });
};
