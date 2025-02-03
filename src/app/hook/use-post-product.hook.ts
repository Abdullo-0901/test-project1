import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createProduct } from "../../http/request-product";
import { PostProduct } from "../../types/globalTypes";

export function usePostProduct() {
  return useMutation({
    mutationFn: (product: PostProduct) => {
      return createProduct({ ...product });
    },
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: () => {
      toast.success("Succes add product");
    },
  });
}
