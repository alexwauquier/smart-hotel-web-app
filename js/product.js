import { getProducts } from "./api/products.js";
import TableManager from "./tableManager.js";

let activeTableId = 'products';
let productsTable = new TableManager(activeTableId);

let prevUrl, nextUrl;

const updateTableData = async (url) => {
  const result = await getProducts(url);

  productsTable.currentData = result.data.products;
  productsTable.currentPage = result.meta.page.current;
  productsTable.itemsPerPage = result.meta.page.size;
  productsTable.totalPages = result.meta.page.total;
  productsTable.itemsTotal = result.meta.total_items

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  productsTable.renderTable();
};

await updateTableData();

productsTable.prevBtn.addEventListener("click", () => {
  if (prevUrl) updateTableData(prevUrl);
});

productsTable.nextBtn.addEventListener("click", () => {
  if (nextUrl) updateTableData(nextUrl);
});
