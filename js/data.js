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
    name: 'Product',
    columns: [
      { id: 'checkbox', label: '', accessor: 'checkbox', sortable: false, filterable: false },
      { id: 'id', label: 'Product #', accessor: 'id', sortable: true, filterable: true },
      { id: 'name', label: 'Product Name', accessor: 'name', sortable: true, filterable: true },
      { id: 'type', label: 'Type', accessor: 'type', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ],
    data: [
      { id: '#SO-00001', name: 'Margarita', type: 'Alcoholic' },
      { id: '#SO-00002', name: 'Pina Colada', type: 'Alcoholic' },
      { id: '#SO-00003', name: 'Virgin Mojito', type: 'Non-Alcoholic' },
      { id: '#SO-00004', name: 'Mojito', type: 'Alcoholic' },
      { id: '#SO-00005', name: 'Lemonade Fizz', type: 'Non-Alcoholic' },
      { id: '#SO-00006', name: 'Shirley Temple', type: 'Non-Alcoholic' },
      { id: '#SO-00007', name: 'Iced Tea Lemonade', type: 'Non-Alcoholic' },
      { id: '#SO-00008', name: 'Long Island Iced Tea', type: 'Alcoholic' },
      { id: '#SO-00009', name: 'Daiquiri', type: 'Alcoholic' },
      { id: '#SO-00010', name: 'Whiskey Sour', type: 'Alcoholic' }
    ]
  },
  customers: {
    id: 'customers',
    name: 'Customer',
    columns: [
      { id: 'checkbox', label: '', accessor: 'checkbox', sortable: false, filterable: false },
      { id: 'id', label: 'Customer ID', accessor: 'id', sortable: true, filterable: true },
      { id: 'name', label: 'Customer Name', accessor: 'name', sortable: true, filterable: true },
      { id: 'email', label: 'Arrival Date', accessor: 'arrival', sortable: true, filterable: true },
      { id: 'status', label: 'Departure Date', accessor: 'departure', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ],
    data: [
      { id: '#CU-00001', name: 'John Doe', arrival: '2025-04-01 08:45', departure: '2025-04-10 17:30' },
      { id: '#CU-00002', name: 'Jane Smith', arrival: '2025-03-28 09:15', departure: '2025-04-02 16:50' },
      { id: '#CU-00003', name: 'Alice Johnson', arrival: '2025-04-25 14:20', departure: '2025-04-29 18:00' },
      { id: '#CU-00004', name: 'Bob Brown', arrival: '2025-04-27 10:00', departure: '2025-04-29 19:10' },
      { id: '#CU-00005', name: 'Charlie White', arrival: '2025-03-30 07:30', departure: '2025-04-01 15:45' },
      { id: '#CU-00006', name: 'David Lee', arrival: '2025-04-29 08:00', departure: '2025-04-29 17:00' },
      { id: '#CU-00007', name: 'Eve Black', arrival: '2025-04-28 13:40', departure: '2025-04-29 17:50' },
      { id: '#CU-00008', name: 'Frank Green', arrival: '2025-03-25 11:05', departure: '2025-03-29 14:20' },
      { id: '#CU-00009', name: 'Grace Blue', arrival: '2025-04-26 12:10', departure: '2025-04-29 16:00' },
      { id: '#CU-00010', name: 'Hank Grey', arrival: '2025-03-31 09:00', departure: '2025-04-03 12:30' }      
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