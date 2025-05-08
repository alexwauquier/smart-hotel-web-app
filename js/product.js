import { getProducts } from "./api/products.js";
import TableManager from "./tableManager.js";

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  const result = await getProducts();

  const products = result.data.products;
  const totalProducts = result.meta.total_items;
  const pagination = result.meta.page;
  const links = result.links;

  let activeTableId = 'products';
  let tableManager = new TableManager(activeTableId , products, totalProducts, pagination, links);
  
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
