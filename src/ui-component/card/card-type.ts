import { SetStateAction } from "react";
import { GetProducts } from "../../types/globalTypes";

export type CardProps = {
  product: GetProducts;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setProductId: React.Dispatch<SetStateAction<number>>;
  setModalType: React.Dispatch<
    SetStateAction<"add" | "delete" | "info" | "edit">
  >;
};
