import { getOrders } from "./api/orders.js";
import TableManager from '../js/tableManager.js';


// Initialize the application
let activeTableId = 'orders';
let ordersTable = new TableManager(activeTableId);

let result = await getOrders();

ordersTable.currentData = result.data.orders;
ordersTable.currentPage = result.meta.page.current;
ordersTable.itemsPerPage = result.meta.page.size;
ordersTable.totalPages = result.meta.page.total;
ordersTable.itemsTotal = result.meta.total_items;

ordersTable.renderTable();

let prevUrl = result.links.prev;
let nextUrl = result.links.next;

ordersTable.prevBtn.addEventListener("click", async () => {
  result = await getOrders(prevUrl);

  ordersTable.currentData = result.data.orders;
  ordersTable.currentPage = result.meta.page.current;
  ordersTable.itemsPerPage = result.meta.page.size;
  ordersTable.totalPages = result.meta.page.total;
  ordersTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  ordersTable.renderTable();
});

ordersTable.nextBtn.addEventListener("click", async () => {
  result = await getOrders(nextUrl);

  ordersTable.currentData = result.data.orders;
  ordersTable.currentPage = result.meta.page.current;
  ordersTable.itemsPerPage = result.meta.page.size;
  ordersTable.totalPages = result.meta.page.total;
  ordersTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  ordersTable.renderTable();
});
