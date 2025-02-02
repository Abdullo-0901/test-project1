import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../http/request-product";

export function useGetProduct(args: { limit: number; offset: number }) {
  return useQuery({
    queryKey: ["products", { limit: args.limit, offset: args.offset }],
    queryFn: () => getProducts({ limit: args.limit, offset: args.offset }),
    initialData: [],
  });
}
