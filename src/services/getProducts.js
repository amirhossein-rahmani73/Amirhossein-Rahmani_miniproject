import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";

const useGetProducts = (page, limit, search) => {
  const queryFn = ({ queryKey }) => {
    const [, page, limit, search] = queryKey;
    return api.get(
      `products?page=${page}&limit=${limit}${search ? `&name=${search}` : ""}`,
    );
  };

  return useQuery({ queryKey: ["get-products", page, limit, search], queryFn });
};

export { useGetProducts };
