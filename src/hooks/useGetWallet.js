import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import { store } from "@/store/store";
import { useQuery } from "react-query";

const useGetWallet = () => {
  const userId = store.getState((state) => state.auth.id);
  return useQuery({
    queryKey: QUERY_KEY.getWalletUser(userId),
    queryFn: async () => {
      return await instance.get(`/wallet/get`, {
        isPublic: false,
      });
    },
  });
};
export default useGetWallet;
