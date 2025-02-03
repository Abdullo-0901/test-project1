import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../http/request-product";

export function useGetProductById(args: { id: number }) {
  return useQuery({
    queryKey: ["productById", { id: args.id }],
    queryFn: () => getProductById({ id: args.id }),
  });
}
