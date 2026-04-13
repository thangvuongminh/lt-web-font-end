import instance from "@/config/axiosConfig";
import { QUERY_KEY } from "@/config/queryConfig";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { data } from "react-router-dom";
const infOauth2 = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  response_type: import.meta.env.VITE_RESPONSE_TYPE,
  scope: import.meta.env.VITE_SCOPE,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
};
export const QUERY_PARAM =
  `https://accounts.google.com/o/oauth2/v2/auth?client_id=${infOauth2.client_id}` +
  `&scope=${infOauth2.scope}` +
  `&redirect_uri=${infOauth2.redirect_uri}` +
  `&response_type=${infOauth2.response_type}`;
export const useLoginOauth2Google = () => {
  return useMutation({
    mutationFn: (code) => {
      return instance.post("user/account/google", code);
    },
    retry: false,
  });
};
