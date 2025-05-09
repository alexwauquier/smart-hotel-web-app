import { getProducts } from "./api/products.js";
import TableManager from "./tableManager.js";

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  const result = await getProducts();

  const products = result.data.products;
  const totalProducts = result.meta.total_items;
  const pagination = result.meta.page;
  const links = result.links;

  let activeTableId = 'products';
  let tableManager = new TableManager(activeTableId , products, totalProducts, pagination, links);
});
