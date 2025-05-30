import { getEmployees } from "./api/employees.js";
import TableManager from '../js/tableManager.js';

let activeTableId = 'employees';
let employeesTable = new TableManager(activeTableId);

let prevUrl, nextUrl;

const updateTableData = async (url) => {
  const result = await getEmployees(url);

  employeesTable.currentData = result.data.employees;
  employeesTable.currentPage = result.meta.page.current;
  employeesTable.itemsPerPage = result.meta.page.size;
  employeesTable.totalPages = result.meta.page.total;
  employeesTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  employeesTable.renderTable();
};

await updateTableData();

employeesTable.prevBtn.addEventListener("click", () => {
  if (prevUrl) updateTableData(prevUrl);
});

employeesTable.nextBtn.addEventListener("click", () => {
  if (nextUrl) updateTableData(nextUrl);
});
