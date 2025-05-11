// Mock data for tables
const tableData = {
  employees: {
    id: 'employees',
    name: 'Employee',
    columns: [
      { id: 'checkbox', label: '', accessor: 'checkbox', sortable: false, filterable: false },
      { id: 'employeeFirstName', label: 'First name', accessor: 'first_name', sortable: true, filterable: true },
      { id: 'employeeLastName', label: 'Last name', accessor: 'last_name', sortable: true, filterable: true },
      { id: 'employeeUsername', label: 'Username', accessor: 'username', sortable: true, filterable: true },
      { id: 'employeeRole', label: 'Role', accessor: 'type.label', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ]
  },
  orders: {
    id: 'orders',
    name: 'Order',
    columns: [
      { id: 'checkbox', label: '', accessor: 'checkbox', sortable: false, filterable: false },
      { id: 'id', label: 'ID', accessor: 'id', sortable: true, filterable: true },
      { id: 'customerName', label: 'Customer last name', accessor: 'customer.last_name', sortable: true, filterable: true },
      { id: 'employeeName', label: 'Employee last name', accessor: 'employee.last_name', sortable: true, filterable: true },
      { id: 'spaceId', label: 'Space ID', accessor: 'space.id', sortable: true, filterable: true },
      { id: 'status', label: 'Status', accessor: 'status.label', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ]
  },
  products: {
    id: 'products',
    name: 'Products',
    columns: [
      { id: 'checkbox', label: '', accessor: 'checkbox', sortable: false, filterable: false },
      { id: 'name', label: 'Name', accessor: 'name', sortable: true, filterable: true },
      { id: 'unit_price', label: 'Price', accessor: 'unit_price', sortable: true, filterable: true },
      { id: 'stock_quantity', label: 'Stock', accessor: 'stock_quantity', sortable: true, filterable: true },
      { id: 'limit_quantity', label: 'Limit', accessor: 'limit_quantity', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ]
  },
  customers: {
    id: 'customers',
    name: 'Customers',
    columns: [
      { id: 'checkbox', label: '', accessor: 'checkbox', sortable: false, filterable: false },
      { id: 'customerFirstName', label: 'First name', accessor: 'first_name', sortable: true, filterable: true },
      { id: 'customerLastName', label: 'Last name', accessor: 'last_name', sortable: true, filterable: true },
      { id: 'customerArrivalDate', label: 'Arrival date', accessor: 'arrival_date', sortable: true, filterable: true },
      { id: 'customerDepartureDate', label: 'Departure date', accessor: 'departure_date', sortable: true, filterable: true },
      { id: 'customerRoom', label: 'Room', accessor: 'space.id', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ]
  },
  dashboard: {
    id: 'dashboard',
    name: 'Dashboard',
    columns: [],
    data: []
  },
  analytics: {
    id: 'analytics',
    name: 'Analytics',
    columns: [],
    data: []
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    columns: [],
    data: []
  }
};

// Function to get a new ID for a table item
function getNewId(tableId) {
  const items = tableData[tableId].data;
  if (items.length === 0) return '#SO-00001';
  
  const lastId = items[items.length - 1].id;
  const numPart = parseInt(lastId.split('-')[1]);
  return `#SO-${String(numPart + 1).padStart(5, '0')}`;
}

// Local storage functions
function saveToLocalStorage() {
  localStorage.setItem('tableData', JSON.stringify(tableData));
}

function loadFromLocalStorage() {
  const storedData = localStorage.getItem('tableData');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    Object.keys(parsedData).forEach(key => {
      if (tableData[key]) {
        tableData[key].data = parsedData[key].data;
      }
    });
  }
}

// Initialize data from local storage
loadFromLocalStorage();

export default tableData;
