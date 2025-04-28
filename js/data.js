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
      { id: '#SO-00003', name: 'Léa Lemoine', role: 'Manager' },
      { id: '#SO-00004', name: 'Maxime Lefevre', role: 'Concierge' },
      { id: '#SO-00005', name: 'Emma Girard', role: 'Bartender' },
      { id: '#SO-00006', name: 'Thomas Petit', role: 'Housekeeper' },
      { id: '#SO-00007', name: 'Claire Martin', role: 'Front Desk Agent' },
      { id: '#SO-00008', name: 'Louis Roux', role: 'Chef' },
      { id: '#SO-00009', name: 'Sophie Moreau', role: 'Sous Chef' },
      { id: '#SO-00010', name: 'Julien Bernard', role: 'Kitchen Staff' },
      { id: '#SO-00011', name: 'Alice Lefevre', role: 'Bartender' },
      { id: '#SO-00012', name: 'Marc Dupont', role: 'Manager' }
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
      { id: '#SO-00003', customerName: 'Antoine Durand', orderNumber: 'ORD-2023-001', status: 'done' },
      { id: '#SO-00004', customerName: 'Claire Lefevre', orderNumber: 'ORD-2023-002', status: 'in progress' },
      { id: '#SO-00005', customerName: 'Julien Dupont', orderNumber: 'ORD-2023-003', status: 'canceled' },
      { id: '#SO-00006', customerName: 'Sophie Martin', orderNumber: 'ORD-2023-004', status: 'done' },
      { id: '#SO-00007', customerName: 'Lucas Bernard', orderNumber: 'ORD-2023-005', status: 'in progress' },
      { id: '#SO-00008', customerName: 'Camille Dubois', orderNumber: 'ORD-2023-006', status: 'in progress' },
      { id: '#SO-00009', customerName: 'Émilie Lefevre', orderNumber: 'ORD-2023-007', status: 'canceled' },
      { id: '#SO-00010', customerName: 'Marc Robert', orderNumber: 'ORD-2023-008', status: 'pending' },
      { id: '#SO-00011', customerName: 'Chloé Lemoine', orderNumber: 'ORD-2023-009', status: 'pending' },
      { id: '#SO-00012', customerName: 'Pierre Lemoine', orderNumber: 'ORD-2023-010', status: 'done' }
    ]
  },
  products: {
    id: 'products',
    name: 'Product',
    columns: [
      { id: 'checkbox', label: '', accessor: 'checkbox', sortable: false, filterable: false },
      { id: 'id', label: 'Product #', accessor: 'id', sortable: true, filterable: true },
      { id: 'name', label: 'Product Name', accessor: 'name', sortable: true, filterable: true },
      { id: 'type', label: 'Type', accessor: 'type', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ],
    data: [
      { id: '#SO-00003', name: 'Margarita', type: 'Alcoholic' },
      { id: '#SO-00004', name: 'Pina Colada', type: 'Alcoholic' },
      { id: '#SO-00005', name: 'Virgin Mojito', type: 'Non-Alcoholic' },
      { id: '#SO-00006', name: 'Mojito', type: 'Alcoholic' },
      { id: '#SO-00007', name: 'Lemonade Fizz', type: 'Non-Alcoholic' },
      { id: '#SO-00008', name: 'Shirley Temple', type: 'Non-Alcoholic' },
      { id: '#SO-00009', name: 'Iced Tea Lemonade', type: 'Non-Alcoholic' },
      { id: '#SO-00010', name: 'Long Island Iced Tea', type: 'Alcoholic' },
      { id: '#SO-00011', name: 'Daiquiri', type: 'Alcoholic' },
      { id: '#SO-00012', name: 'Whiskey Sour', type: 'Alcoholic' }
    ]
  },
  customers: {
    id: 'customers',
    name: 'Customer',
    columns: [
      { id: 'checkbox', label: '', accessor: 'checkbox', sortable: false, filterable: false },
      { id: 'id', label: 'Customer ID', accessor: 'id', sortable: true, filterable: true },
      { id: 'name', label: 'Customer Name', accessor: 'name', sortable: true, filterable: true },
      { id: 'email', label: 'Email', accessor: 'email', sortable: true, filterable: true },
      { id: 'status', label: 'Status', accessor: 'status', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ],
    data: [
      { id: '#CU-00001', name: 'John Doe', email: 'johndoe@example.com', status: 'Active' },
      { id: '#CU-00002', name: 'Jane Smith', email: 'janesmith@example.com', status: 'Inactive' },
      { id: '#CU-00003', name: 'Alice Johnson', email: 'alicej@example.com', status: 'Active' },
      { id: '#CU-00004', name: 'Bob Brown', email: 'bobbrown@example.com', status: 'Active' },
      { id: '#CU-00005', name: 'Charlie White', email: 'charliew@example.com', status: 'Inactive' },
      { id: '#CU-00006', name: 'David Lee', email: 'davidlee@example.com', status: 'Active' },
      { id: '#CU-00007', name: 'Eve Black', email: 'eveblack@example.com', status: 'Active' },
      { id: '#CU-00008', name: 'Frank Green', email: 'frankgreen@example.com', status: 'Inactive' },
      { id: '#CU-00009', name: 'Grace Blue', email: 'graceblue@example.com', status: 'Active' },
      { id: '#CU-00010', name: 'Hank Grey', email: 'hankgrey@example.com', status: 'Inactive' }
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