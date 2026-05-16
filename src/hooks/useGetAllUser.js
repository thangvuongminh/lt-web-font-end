import instance from "@/config/axiosConfig";
import axios from "axios";
import { useMutation } from "react-query";

export const useGetAllUser = () => {
  return useMutation({
    mutationFn: ({ data, page }) => {
      return instance.post("admin/get/all/users", data, {
        params: {
          page: page.numberPage,
          size: 10,
          sortBy: page.sortBy,
        },
        isPublic: false,
      });
    },
  });
};
