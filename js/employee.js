import { getEmployees } from "./api/employees.js";
import TableManager from '../js/tableManager.js';

// Initialize the application
let activeTableId = 'employees';
let employeesTable = new TableManager(activeTableId);

let result = await getEmployees();

employeesTable.currentData = result.data.employees;
employeesTable.currentPage = result.meta.page.current;
employeesTable.itemsPerPage = result.meta.page.size;
employeesTable.totalPages = result.meta.page.total;
employeesTable.itemsTotal = result.meta.total_items;

employeesTable.renderTable();

let prevUrl = result.links.prev;
let nextUrl = result.links.next;

employeesTable.prevBtn.addEventListener("click", async () => {
  result = await getEmployees(prevUrl);

  employeesTable.currentData = result.data.employees;
  employeesTable.currentPage = result.meta.page.current;
  employeesTable.itemsPerPage = result.meta.page.size;
  employeesTable.totalPages = result.meta.page.total;
  employeesTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  employeesTable.renderTable();
});

employeesTable.nextBtn.addEventListener("click", async () => {
  result = await getEmployees(nextUrl);

  employeesTable.currentData = result.data.employees;
  employeesTable.currentPage = result.meta.page.current;
  employeesTable.itemsPerPage = result.meta.page.size;
  employeesTable.totalPages = result.meta.page.total;
  employeesTable.itemsTotal = result.meta.total_items;

  prevUrl = result.links.prev;
  nextUrl = result.links.next;

  employeesTable.renderTable();
});
