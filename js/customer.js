import { getCustomers } from "./api/customers.js";
import TableManager from '../js/tableManager.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  let activeTableId = 'customers';
  let customersTable = new TableManager(activeTableId);

  const result = await getCustomers();

  customersTable.currentData = result.data.customers;
  customersTable.currentPage = result.meta.page.current;
  customersTable.itemsPerPage = result.meta.page.size;
  customersTable.itemsTotal = result.meta.total_items;
  
  customersTable.renderTable();
});
