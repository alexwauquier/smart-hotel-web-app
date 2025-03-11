// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Default table to show
  let activeTableId = 'employees';
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
  
  // Handle dashboard and other non-table views
  function handleSpecialViews(tableId) {
    const tableContainer = document.getElementById('table-container');
    
    if (['dashboard', 'analytics', 'settings'].includes(tableId)) {
      tableContainer.innerHTML = `
        <h1>${tableData[tableId].name}</h1>
        <div class="placeholder-content">
          <p>This is a placeholder for the ${tableData[tableId].name} view.</p>
          <p>In a real application, this would contain ${tableId}-specific content.</p>
        </div>
      `;
      return true;
    }
    
    return false;
  }
});