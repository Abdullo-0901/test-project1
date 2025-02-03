import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../../http/request-product";
import { toast } from "react-toastify";

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (productId: number) => {
      return deleteProduct({ id: productId });
    },
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: (data: any) => {
      toast.success("succes delete");
    },
  });
}
