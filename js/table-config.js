// Mock data for tables
const tableData = {
  employees: {
    id: 'employees',
    name: 'Employees',
    columns: [
      { id: 'employeeFirstName', label: 'First name', accessor: 'first_name', sortable: true, filterable: true },
      { id: 'employeeLastName', label: 'Last name', accessor: 'last_name', sortable: true, filterable: true },
      { id: 'employeeUsername', label: 'Username', accessor: 'username', sortable: true, filterable: true },
      { id: 'employeeRole', label: 'Role', accessor: 'type.label', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ]
  },
  orders: {
    id: 'orders',
    name: 'Orders',
    columns: [
      { id: 'id', label: 'ID', accessor: 'id', sortable: true, filterable: true },
      { id: 'customerName', label: 'Customer last name', accessor: 'customer.last_name', sortable: true, filterable: true },
      { id: 'employeeName', label: 'Employee last name', accessor: 'employee.last_name', sortable: true, filterable: true },
      { id: 'spaceId', label: 'Space ID', accessor: 'space.id', sortable: true, filterable: true },
      { id: 'status', label: 'Status', accessor: 'status.label', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false, delete: false }
    ]
  },
  products: {
    id: 'products',
    name: 'Products',
    columns: [
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
      { id: 'customerFirstName', label: 'First name', accessor: 'first_name', sortable: true, filterable: true },
      { id: 'customerLastName', label: 'Last name', accessor: 'last_name', sortable: true, filterable: true },
      { id: 'customerArrivalDate', label: 'Arrival date', accessor: 'arrival_date', sortable: true, filterable: true },
      { id: 'customerDepartureDate', label: 'Departure date', accessor: 'departure_date', sortable: true, filterable: true },
      { id: 'customerRoom', label: 'Room', accessor: 'space.id', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ]
  }
};

export default tableData;
