import {
  createProductRepo,
  getProductsRepo,
  getProductByIdRepo
} from "../repositories/productRepository";

export const createProductService = async (data: any) => {
  const { name, description, price, stock, category_id } = data;

  if (!name || !price) {
    throw new Error("Missing required fields");
  }

  return await createProductRepo(
    name,
    description,
    price,
    stock,
    category_id
  );
};

export const getProductsService = async (filters: any) => {
  return await getProductsRepo(filters);
};

export const getProductByIdService = async (id: string) => {
  const product = await getProductByIdRepo(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};