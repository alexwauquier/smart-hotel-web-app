// Mock data for tables
const tableData = {
  customers: {
    id: 'customers',
    name: 'Customers',
    columns: [
      { id: 'customer-first-name', label: 'First name', accessor: 'first_name', sortable: true, filterable: true },
      { id: 'customer-last-name', label: 'Last name', accessor: 'last_name', sortable: true, filterable: true },
      { id: 'customer-arrival-date', label: 'Arrival date', accessor: 'arrival_date', sortable: true, filterable: true },
      { id: 'customer-departure-date', label: 'Departure date', accessor: 'departure_date', sortable: true, filterable: true },
      { id: 'customer-space-id', label: 'Room', accessor: 'space.id', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ]
  },
  employees: {
    id: 'employees',
    name: 'Employees',
    columns: [
      { id: 'employee-first-name', label: 'First name', accessor: 'first_name', sortable: true, filterable: true },
      { id: 'employee-last-name', label: 'Last name', accessor: 'last_name', sortable: true, filterable: true },
      { id: 'employee-username', label: 'Username', accessor: 'username', sortable: true, filterable: true },
      { id: 'employee-type-label', label: 'Role', accessor: 'type.label', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ]
  },
  products: {
    id: 'products',
    name: 'Products',
    columns: [
      { id: 'product-name', label: 'Name', accessor: 'name', sortable: true, filterable: true },
      { id: 'product-unit-price', label: 'Price', accessor: 'unit_price', sortable: true, filterable: true },
      { id: 'product-stock-quantity', label: 'Stock', accessor: 'stock_quantity', sortable: true, filterable: true },
      { id: 'product-limit-quantity', label: 'Limit', accessor: 'limit_quantity', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false }
    ]
  },
  orders: {
    id: 'orders',
    name: 'Orders',
    columns: [
      { id: 'id', label: 'ID', accessor: 'id', sortable: true, filterable: true },
      { id: 'customer-last-name', label: 'Customer last name', accessor: 'customer.last_name', sortable: true, filterable: true },
      { id: 'employee-last-name', label: 'Employee last name', accessor: 'employee.last_name', sortable: true, filterable: true },
      { id: 'order-space-id', label: 'Space ID', accessor: 'space.id', sortable: true, filterable: true },
      { id: 'order-status-label', label: 'Status', accessor: 'status.label', sortable: true, filterable: true },
      { id: 'actions', label: 'Action', accessor: 'actions', sortable: false, filterable: false, delete: false }
    ]
  }
};

export default tableData;
