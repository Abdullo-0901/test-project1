import axios, { AxiosError } from "axios";
import { GetProducts, PostProduct, PutProduct } from "../types/globalTypes";
import { toast } from "react-toastify";
import { queryClient } from "../utils/reactQuery";

export async function deleteProduct({ id }: { id: number }) {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASE_ULR}/products/${id}`
    );

    queryClient.invalidateQueries({ queryKey: ["products"] });
    return data;
  } catch (error_) {
    const error = error_ as AxiosError<{ message: string }>;
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        toast.error("Error: Invalid request. Please try again!");
      } else if (status === 404) {
        toast.error("Error: Product not found. Please check again!");
      } else if (status === 500) {
        toast.error("Error: Server issue. Please try again later.");
      } else {
        toast.error(`Error occurred: ${error.message}`);
      }
    } else {
      toast.error("Network error: Please check your internet connection!");
    }
  }
}

export async function getProducts(args: {
  limit: number;
  offset: number;
}): Promise<GetProducts[]> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_ULR}/products/?limit=${args.limit}&offset=${
        args.offset
      }`
    );
    return response.data;
  } catch (error_) {
    const error = error_ as AxiosError<{ message: string }>;

    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        toast.error("Error: Invalid request. Please try again!");
      } else if (status === 404) {
        toast.error("Error: Product not found. Please check again!");
      } else if (status === 500) {
        toast.error("Error: Server issue. Please try again later.");
      } else {
        toast.error(`Error occurred: ${error.message}`);
      }
    } else {
      toast.error("Network error: Please check your internet connection!");
    }

    return [];
  }
}
export async function getProductById(args: {
  id: number;
}): Promise<GetProducts | null> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_ULR}/products/${args.id}`
    );
    return response.data;
  } catch (error_) {
    const error = error_ as AxiosError<{ message: string }>;

    if (error.response) {
      const { status } = error.response;

      if (status === 400) {
        toast.error("Error: Invalid request. Please try again!");
      } else if (status === 404) {
        toast.error("Error: Product not found. Please check again!");
      } else if (status === 500) {
        toast.error("Error: Server issue. Please try again later.");
      } else {
        toast.error(`Error occurred: ${error.message}`);
      }
    } else {
      toast.error("Network error: Please check your internet connection!");
    }

    return null;
  }
}

export async function createProduct(product: PostProduct) {
  try {
    const response = await axios.post(
      "https://api.escuelajs.co/api/v1/products",
      product
    );
    queryClient.invalidateQueries({ queryKey: ["products"] });
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
