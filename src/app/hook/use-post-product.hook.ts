import { useMutation } from "@tanstack/react-query";
import { createProduct, deleteProduct } from "../../http/request-product";
import { toast } from "react-toastify";
import { PostProduct } from "../../types/globalTypes";

export function usePostProduct() {
  return useMutation({
    mutationFn: (product: PostProduct) => {
      return createProduct({ ...product });
    },
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: (data: any) => {
      toast.success("succes delete");
    },
  });
}
