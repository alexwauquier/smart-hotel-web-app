import { getEmployees } from "../api/employees.js";
import TableManager from '../table-manager.js';
import saveEmployee from "./modal.js";

const saveBtn = document.getElementById('save-btn');

let activeTableId = 'employees';
let employeesTable = new TableManager(activeTableId);

let prevUrl, nextUrl, currentUrl;

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
  currentUrl = prevUrl;
});

employeesTable.nextBtn.addEventListener("click", () => {
  if (nextUrl) updateTableData(nextUrl);
  currentUrl = nextUrl;
});

saveBtn.addEventListener('click', async () => {
  await saveEmployee(employeesTable.currentItemId);

  employeesTable.closeModal();

  await updateTableData(currentUrl);
});

const dropdownConfig = {
  "type.label": {
    apiPath: "/api/employees/types",
    responseDataPath: ['data', 'employee_types'],
    valueField: "id",
    labelField: "label"
  }
};

employeesTable.dropdownConfig = dropdownConfig;
