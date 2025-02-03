import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../http/request-category";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}
