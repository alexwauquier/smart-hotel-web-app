import { getCustomers } from "./api/customers.js";
import TableManager from '../js/tableManager.js';

let activeTableId = 'customers';
let customersTable = new TableManager(activeTableId);

let prevUrl, nextUrl;

const updateTableData = async (url) => {
  const result = await getCustomers(url);

  result.data.customers = result.data.customers.map(customer => ({
    ...customer,
    arrival_date: new Date(customer.arrival_date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }),
    departure_date: new Date(customer.departure_date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
  }));

  customersTable.currentData = result.data.customers;
  customersTable.currentPage = result.meta.page.current;
  customersTable.itemsPerPage = result.meta.page.size;
  customersTable.totalPages = result.meta.page.total;
  customersTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  customersTable.renderTable();
};

await updateTableData();

customersTable.prevBtn.addEventListener("click", () => {
  if (prevUrl) updateTableData(prevUrl);
});

customersTable.nextBtn.addEventListener("click", () => {
  if (nextUrl) updateTableData(nextUrl);
});
