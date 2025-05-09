import { getCustomers } from "./api/customers.js";
import TableManager from '../js/tableManager.js';

// Initialize the application
let activeTableId = 'customers';
let customersTable = new TableManager(activeTableId);

let result = await getCustomers();

customersTable.currentData = result.data.customers;
customersTable.currentPage = result.meta.page.current;
customersTable.itemsPerPage = result.meta.page.size;
customersTable.totalPages = result.meta.page.total;
customersTable.itemsTotal = result.meta.total_items;

customersTable.renderTable();

let prevUrl = result.links.prev;
let nextUrl = result.links.next;

customersTable.prevBtn.addEventListener("click", async () => {
  result = await getCustomers(prevUrl);

  customersTable.currentData = result.data.customers;
  customersTable.currentPage = result.meta.page.current;
  customersTable.itemsPerPage = result.meta.page.size;
  customersTable.totalPages = result.meta.page.total;
  customersTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  customersTable.renderTable();
});

customersTable.nextBtn.addEventListener("click", async () => {
  result = await getCustomers(nextUrl);

  customersTable.currentData = result.data.customers;
  customersTable.currentPage = result.meta.page.current;
  customersTable.itemsPerPage = result.meta.page.size;
  customersTable.totalPages = result.meta.page.total;
  customersTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  customersTable.renderTable();
});
