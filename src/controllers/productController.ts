import { Request, Response } from "express";
import {
  createProductService,
  getProductsService,
  getProductByIdService
} from "../services/productService";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProductsService(req.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await getProductByIdService(req.params.id as string);
    res.json(product);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};