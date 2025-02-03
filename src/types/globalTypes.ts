export type GetProducts = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
};

export type Category = {
  id: number;
  name: string;
  image: string;
};

export type PostProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

export type PutProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string;
};

export type GetCategory = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};
