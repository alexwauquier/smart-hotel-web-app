import { getCustomers } from "./api/customers.js";
import TableManager from '../js/tableManager.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  const result = await getCustomers();

  const customers = result.data.customers;
  const totalCustomers = result.meta.total_items;
  const pagination = result.meta.page;
  const links = result.links;

  let activeTableId = 'customers';
  let tableManager = new TableManager(activeTableId, customers, totalCustomers, pagination, links);
});
