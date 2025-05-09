// Mock data for tables
const tableData = {
  employees: {
    id: 'employees',
    name: 'Employee',
    columns: [
      { id: 'checkbox', label: '', accessor: 'checkbox', sortable: false, filterable: false },
      { id: 'id', label: 'Employee #', accessor: 'id', sortable: true, filterable: true },
      { id: 'name', label: 'Employee Name', accessor: 'name', sortable: true, filterable: true },
      { id: 'role', label: 'Role', accessor: 'role', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ],
    data: [
      { id: '#SO-00001', name: 'Léa Lemoine', role: 'Manager' },
      { id: '#SO-00002', name: 'Maxime Lefevre', role: 'Concierge' },
      { id: '#SO-00003', name: 'Emma Girard', role: 'Bartender' },
      { id: '#SO-00004', name: 'Thomas Petit', role: 'Housekeeper' },
      { id: '#SO-00005', name: 'Claire Martin', role: 'Front Desk Agent' },
      { id: '#SO-00006', name: 'Louis Roux', role: 'Chef' },
      { id: '#SO-00007', name: 'Sophie Moreau', role: 'Sous Chef' },
      { id: '#SO-00008', name: 'Julien Bernard', role: 'Kitchen Staff' },
      { id: '#SO-00009', name: 'Alice Lefevre', role: 'Bartender' },
      { id: '#SO-00010', name: 'Marc Dupont', role: 'Manager' }
    ]
  },
  orders: {
    id: 'orders',
    name: 'Order',
    columns: [
      { id: 'checkbox', label: '', accessor: 'checkbox', sortable: false, filterable: false },
      { id: 'id', label: 'Order #', accessor: 'id', sortable: true, filterable: true },
      { id: 'customerName', label: 'Customer Name', accessor: 'customerName', sortable: true, filterable: true },
      { id: 'orderNumber', label: 'Order Number', accessor: 'orderNumber', sortable: true, filterable: true },
      { id: 'status', label: 'Status', accessor: 'status', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ],
    data: [
      { id: '#SO-00001', customerName: 'Antoine Durand', orderNumber: 'ORD-2023-001', status: 'done' },
      { id: '#SO-00002', customerName: 'Claire Lefevre', orderNumber: 'ORD-2023-002', status: 'in progress' },
      { id: '#SO-00003', customerName: 'Julien Dupont', orderNumber: 'ORD-2023-003', status: 'canceled' },
      { id: '#SO-00004', customerName: 'Sophie Martin', orderNumber: 'ORD-2023-004', status: 'done' },
      { id: '#SO-00005', customerName: 'Lucas Bernard', orderNumber: 'ORD-2023-005', status: 'in progress' },
      { id: '#SO-00006', customerName: 'Camille Dubois', orderNumber: 'ORD-2023-006', status: 'in progress' },
      { id: '#SO-00007', customerName: 'Émilie Lefevre', orderNumber: 'ORD-2023-007', status: 'canceled' },
      { id: '#SO-00008', customerName: 'Marc Robert', orderNumber: 'ORD-2023-008', status: 'pending' },
      { id: '#SO-00009', customerName: 'Chloé Lemoine', orderNumber: 'ORD-2023-009', status: 'pending' },
      { id: '#SO-00010', customerName: 'Pierre Lemoine', orderNumber: 'ORD-2023-010', status: 'done' }
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
      { id: 'id', label: 'ID', accessor: 'id', sortable: true, filterable: true },
      { id: 'first_name', label: 'First name', accessor: 'first_name', sortable: true, filterable: true },
      { id: 'last_name', label: 'Last name', accessor: 'last_name', sortable: true, filterable: true },
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
