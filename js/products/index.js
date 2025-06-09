import { getProducts } from "../api/products.js";
import TableManager from "../table-manager.js";
import saveProduct from "./modal.js";

const saveBtn = document.getElementById('save-btn');

let activeTableId = 'products';
let productsTable = new TableManager(activeTableId);

let prevUrl, nextUrl, currentUrl;

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
  currentUrl = prevUrl;
});

productsTable.nextBtn.addEventListener("click", () => {
  if (nextUrl) updateTableData(nextUrl);
  currentUrl = nextUrl;
});

saveBtn.addEventListener('click', async () => {
  await saveProduct(productsTable.currentItemId);

  productsTable.closeModal();

  await updateTableData(currentUrl);
});
