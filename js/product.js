import { getProducts } from "./api/products.js";
import TableManager from "./tableManager.js";

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  let activeTableId = 'products';
  let productsTable = new TableManager(activeTableId);

  const result = await getProducts();

  productsTable.currentData = result.data.products;
  productsTable.currentPage = result.meta.page.current;
  productsTable.itemsPerPage = result.meta.page.size;
  productsTable.itemsTotal = result.meta.total_items

  productsTable.renderTable();
});
