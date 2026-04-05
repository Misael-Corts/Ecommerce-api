import { pool } from "../config/db";

export const createProductRepo = async (
  name: string,
  description: string,
  price: number,
  stock: number,
  category_id: string
) => {
  const result = await pool.query(
    `INSERT INTO products (name, description, price, stock, category_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, description, price, stock, category_id]
  );

  return result.rows[0];
};

export const getProductsRepo = async (filters: any) => {
  const { page = 1, limit = 10, search, minPrice, maxPrice, category } = filters;

  const offset = (page - 1) * limit;

  let query = `
    SELECT p.*, c.name as category
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;

  const values: any[] = [];
  let index = 1;

  if (search) {
    query += ` AND p.name ILIKE $${index++}`;
    values.push(`%${search}%`);
  }

  if (minPrice) {
    query += ` AND p.price >= $${index++}`;
    values.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND p.price <= $${index++}`;
    values.push(maxPrice);
  }

  if (category) {
    query += ` AND c.name ILIKE $${index++}`;
    values.push(`%${category}%`);
  }

  query += ` ORDER BY p.created_at DESC LIMIT $${index++} OFFSET $${index++}`;

  values.push(limit, offset);

  const result = await pool.query(query, values);

  return result.rows;
};

export const getProductByIdRepo = async (id: string) => {
  const result = await pool.query(
    `SELECT p.*, c.name as category
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = $1`,
    [id]
  );

  return result.rows[0];
};