import { getProducts } from "./api/products.js";
import TableManager from "./tableManager.js";

// Initialize the application
let activeTableId = 'products';
let productsTable = new TableManager(activeTableId);

let result = await getProducts();

productsTable.currentData = result.data.products;
productsTable.currentPage = result.meta.page.current;
productsTable.itemsPerPage = result.meta.page.size;
productsTable.totalPages = result.meta.page.total;
productsTable.itemsTotal = result.meta.total_items

productsTable.renderTable();

let prevUrl = result.links.prev;
let nextUrl = result.links.next;

productsTable.prevBtn.addEventListener("click", async () => {
  result = await getProducts(prevUrl);

  productsTable.currentData = result.data.products;
  productsTable.currentPage = result.meta.page.current;
  productsTable.itemsPerPage = result.meta.page.size;
  productsTable.totalPages = result.meta.page.total;
  productsTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  productsTable.renderTable();
});

productsTable.nextBtn.addEventListener("click", async () => {
  result = await getProducts(nextUrl);

  productsTable.currentData = result.data.products;
  productsTable.currentPage = result.meta.page.current;
  productsTable.itemsPerPage = result.meta.page.size;
  productsTable.totalPages = result.meta.page.total;
  productsTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  productsTable.renderTable();
});
