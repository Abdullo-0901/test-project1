import axios from "axios";
import { GetProducts, PostProduct, PutProduct } from "../types/globalTypes";

export async function deleteProduct({ id }: { id: number }) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_ULR}/${id}`
    );
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts(args: {
  limit: number;
  offset: number;
}): Promise<GetProducts[]> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_ULR}/?limit=${args.limit}&offset=${
        args.offset
      }`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createProduct(
  product: PostProduct
): Promise<GetProducts> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/products`,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(
  id: string,
  product: Partial<PutProduct>
): Promise<GetProducts> {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/products/${id}`,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
