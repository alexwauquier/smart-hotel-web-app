import { getCustomers } from "./api/customers.js";
import TableManager from '../js/tableManager.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  const result = await getCustomers();

  const customers = result.data.customers;
  const totalCustomers = result.meta.total_items;
  const pagination = result.meta.page;
  const links = result.links;

  let tableManager = new TableManager('customers', customers, totalCustomers, pagination, links);
  
  // Set active nav item
  setActiveNavItem(activeTableId);
  
  // Setup navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tableId = item.dataset.table;
      
      if (tableId && tableData[tableId]) {
        activeTableId = tableId;
        tableManager = new TableManager(tableId);
        setActiveNavItem(tableId);
      }
    });
  });
  
  // Function to set active nav item
  function setActiveNavItem(tableId) {
    navItems.forEach(item => {
      if (item.dataset.table === tableId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
});
