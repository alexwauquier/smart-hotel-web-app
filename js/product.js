// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Default table to show
  let activeTableId = 'products';
  let tableManager = new TableManager(activeTableId);
  
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
