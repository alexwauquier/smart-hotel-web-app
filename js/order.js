import { getOrders } from "./api/orders.js";
import TableManager from '../js/tableManager.js';

let activeTableId = 'orders';
let ordersTable = new TableManager(activeTableId);

let prevUrl, nextUrl;

const updateTableData = async (url) => {
  const result = await getOrders(url);

  ordersTable.currentData = result.data.orders;
  ordersTable.currentPage = result.meta.page.current;
  ordersTable.itemsPerPage = result.meta.page.size;
  ordersTable.totalPages = result.meta.page.total;
  ordersTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  ordersTable.renderTable();
};

await updateTableData();

ordersTable.prevBtn.addEventListener("click", () => {
  if (prevUrl) updateTableData(prevUrl);
});

ordersTable.nextBtn.addEventListener("click", () => {
  if (nextUrl) updateTableData(nextUrl);
});
