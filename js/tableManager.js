import tableData from "./data.js";

class TableManager {
  constructor(tableId) {
    this.tableId = tableId;
    this.tableConfig = tableData[tableId];
    this.currentData = [];
    this.filteredData = [...this.currentData];
    this.sortColumn = null;
    this.sortDirection = 'asc';
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.totalPages = 1
    this.itemsTotal = 10;
    this.filter = { column: '', value: '' };
    
    // DOM elements
    this.tableTitle = document.getElementById('table-title');
    this.tableHeaders = document.getElementById('table-headers');
    this.tableBody = document.getElementById('table-body');
    this.pageStart = document.getElementById('page-start');
    this.pageEnd = document.getElementById('page-end');
    this.totalItems = document.getElementById('total-items');
    this.pageNumbers = document.getElementById('page-numbers');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.filterBtn = document.getElementById('filter-btn');
    this.filterDropdown = document.getElementById('filter-dropdown');
    this.filterColumn = document.getElementById('filter-column');
    this.filterValue = document.getElementById('filter-value');
    this.applyFilterBtn = document.getElementById('apply-filter');
    this.clearFilterBtn = document.getElementById('clear-filter');
    this.addItemBtn = document.getElementById('add-item-btn');
    this.modal = document.getElementById('modal');
    this.modalTitle = document.getElementById('modal-title');
    this.itemForm = document.getElementById('item-form');
    this.closeModalBtn = document.getElementById('close-modal');
    this.cancelBtn = document.getElementById('cancel-btn');
    this.saveBtn = document.getElementById('save-btn');
    this.confirmModal = document.getElementById('confirm-modal');
    this.closeConfirmModalBtn = document.getElementById('close-confirm-modal');
    this.cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    this.confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    
    this.currentItemId = null;
    
    this.init();
  }
  
  init() {
    this.setupTable();
    this.setupEventListeners();
    this.renderTable();
  }
  
  setupTable() {
    // Set table title
    this.tableTitle.textContent = this.tableConfig.name;
    
    // Set filter button text
    this.filterBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
      Filter ${this.tableConfig.id}
    `;
    
    // Set add button text
    this.addItemBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      New ${this.tableConfig.id.slice(0, -1)}
    `;
    
    // Setup filter dropdown options
    this.filterColumn.innerHTML = '';
    this.tableConfig.columns.forEach(column => {
      if (column.filterable) {
        const option = document.createElement('option');
        option.value = column.accessor;
        option.textContent = column.label;
        this.filterColumn.appendChild(option);
      }
    });
    
    // Setup table headers
    this.tableHeaders.innerHTML = '';
    this.tableConfig.columns.forEach(column => {
      const th = document.createElement('th');
      th.textContent = column.label;
      
      if (column.sortable) {
        th.classList.add('sortable');
        th.dataset.column = column.accessor;
        th.addEventListener('click', () => this.handleSort(column.accessor));
      }
      
      this.tableHeaders.appendChild(th);
    });
  }
  
  setupEventListeners() {
    // Filter
    this.filterBtn.addEventListener('click', () => this.toggleFilterDropdown());
    this.applyFilterBtn.addEventListener('click', () => this.applyFilter());
    this.clearFilterBtn.addEventListener('click', () => this.clearFilter());
    
    // Add/Edit
    this.addItemBtn.addEventListener('click', () => this.showAddModal());
    this.closeModalBtn.addEventListener('click', () => this.closeModal());
    this.cancelBtn.addEventListener('click', () => this.closeModal());
    this.saveBtn.addEventListener('click', () => this.saveItem());
    
    // Delete confirmation
    this.closeConfirmModalBtn.addEventListener('click', () => this.closeConfirmModal());
    this.cancelDeleteBtn.addEventListener('click', () => this.closeConfirmModal());
    this.confirmDeleteBtn.addEventListener('click', () => this.deleteItem());
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.filterDropdown.contains(e.target) && !this .filterBtn.contains(e.target)) {
        this.filterDropdown.classList.add('hidden');
      }
    });

    // Search functionality
    document.getElementById('search-input').addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });
  }
  
  renderTable() {
    // Apply filters and sorting
    this.applyFiltersAndSort();
    
    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    
    // Update pagination info
    this.pageStart.textContent = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.pageEnd.textContent = this.currentPage * this.itemsPerPage > this.itemsTotal ? this.itemsTotal : this.currentPage * this.itemsPerPage;
    this.totalItems.textContent = this.itemsTotal;
    
    // Render table rows
    this.tableBody.innerHTML = '';
    
    if (this.currentData.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = this.tableConfig.columns.length;
      td.textContent = 'No data found';
      td.style.textAlign = 'center';
      td.style.padding = '2rem';
      tr.appendChild(td);
      this.tableBody.appendChild(tr);
    } else {
      this.currentData.forEach(item => {
        const tr = document.createElement('tr');
        
        this.tableConfig.columns.forEach(column => {
          const td = document.createElement('td');
          
          if (column.accessor === 'checkbox') {
            td.classList.add('checkbox-col');
            td.innerHTML = '<input type="checkbox">';
          } else if (column.accessor === 'actions') {
            td.classList.add('action-col');
            td.innerHTML = `
              <div style="position: relative; display: inline-block;">
                <svg id="menu-icon" class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" 
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                </svg>
                <div id="dropdown-menu">
                  <button class="action-btn" style="display: block; width: 100%; padding: 8px; border: none; text-align: left; cursor: pointer;">View</button>
                  <button class="action-btn" style="display: block; width: 100%; padding: 8px; border: none; text-align: left; cursor: pointer;">Edit</button>
                  <button class="action-btn delete" style="display: block; width: 100%; padding: 8px; border: none; text-align: left; cursor: pointer;">Delete</button>
                </div>
              </div>
            `;

            const icon = td.querySelector('#menu-icon');
            const dropdown = td.querySelector('#dropdown-menu');

            icon.addEventListener('click', (e) => {
              e.stopPropagation(); // empêcher que le clic remonte et ferme le menu immédiatement
              if (dropdown.style.display === 'none' || dropdown.style.display === '') {
                dropdown.style.display = 'block';
              } else {
                dropdown.style.display = 'none';
              }
            });

            // Fermer le menu si on clique ailleurs sur la page
            document.addEventListener('click', () => {
              dropdown.style.display = 'none';
            });

            
            // Add event listeners to action buttons
            const viewBtn = td.querySelector('button:nth-child(1)');
            const editBtn = td.querySelector('button:nth-child(2)');
            const deleteBtn = td.querySelector('button:nth-child(3)');
            
            viewBtn.addEventListener('click', () => this.viewItem(item));
            editBtn.addEventListener('click', () => this.showEditModal(item));
            deleteBtn.addEventListener('click', () => this.showDeleteConfirmation(item));
          } else if (column.accessor === 'status' && this.tableId === 'orders') {
            const statusValue = item[column.accessor];
            td.innerHTML = `<span class="status ${statusValue}">${this.formatStatus(statusValue)}</span>`;
          } else {
            td.textContent = this.getNestedValue(item, column.accessor) || '';
          }
          
          tr.appendChild(td);
        });
        
        this.tableBody.appendChild(tr);
      });
    }
    
    // Render pagination
    this.renderPagination(this.totalPages);
  }
  
  renderPagination(totalPages) {
    this.pageNumbers.innerHTML = '';
    
    // Determine which page numbers to show
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 2);
    
    if (endPage - startPage < 2) {
      startPage = Math.max(1, endPage - 2);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.classList.add('pagination-btn');
      if (i === this.currentPage) {
        pageBtn.classList.add('active');
      }
      pageBtn.textContent = i;
      this.pageNumbers.appendChild(pageBtn);
    }
    
    // Disable/enable prev/next buttons
    this.prevBtn.disabled = this.currentPage === 1;
    this.nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
    
    // Add visual indication for disabled buttons
    if (this.prevBtn.disabled) {
      this.prevBtn.style.opacity = '0.5';
      this.prevBtn.style.cursor = 'not-allowed';
    } else {
      this.prevBtn.style.opacity = '1';
      this.prevBtn.style.cursor = 'pointer';
    }
    
    if (this.nextBtn.disabled) {
      this.nextBtn.style.opacity = '0.5';
      this.nextBtn.style.cursor = 'not-allowed';
    } else {
      this.nextBtn.style.opacity = '1';
      this.nextBtn.style.cursor = 'pointer';
    }
  }
  
  applyFiltersAndSort() {
    // Apply search and column filters
    this.filteredData = [...this.currentData];
    
    if (this.filter.column && this.filter.value) {
      this.filteredData = this.filteredData.filter(item => {
        const itemValue = String(item[this.filter.column] || '').toLowerCase();
        return itemValue.includes(this.filter.value.toLowerCase());
      });
    }
    
    // Apply sorting
    if (this.sortColumn) {
      this.filteredData.sort((a, b) => {
        const valueA = String(a[this.sortColumn] || '').toLowerCase();
        const valueB = String(b[this.sortColumn] || '').toLowerCase();
        
        if (valueA < valueB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  }
  
  handleSort(column) {
    // Update sort indicators in the UI
    const headers = this.tableHeaders.querySelectorAll('th');
    headers.forEach(header => {
      if (header.dataset.column === column) {
        header.classList.remove('sortable', 'sort-asc', 'sort-desc');
        
        if (this.sortColumn === column) {
          // Toggle direction if already sorting by this column
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
          header.classList.add(this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
        } else {
          // New sort column
          this.sortColumn = column;
          this.sortDirection = 'asc';
          header.classList.add('sort-asc');
        }
      } else if (header.dataset.column) {
        header.classList.remove('sort-asc', 'sort-desc');
        header.classList.add('sortable');
      }
    });
    
    this.currentPage = 1;
    this.renderTable();
  }
  
  toggleFilterDropdown() {
    this.filterDropdown.classList.toggle('hidden');
  }
  
  applyFilter() {
    const column = this.filterColumn.value;
    const value = this.filterValue.value.trim();
    
    if (column && value) {
      this.filter = { column, value };
      this.currentPage = 1;
      this.renderTable();
    }
    
    this.filterDropdown.classList.add('hidden');
  }
  
  clearFilter() {
    this.filter = { column: '', value: '' };
    this.filterValue.value = '';
    this.currentPage = 1;
    this.renderTable();
    this.filterDropdown.classList.add('hidden');
  }
  
  handleSearch(searchTerm) {
    if (searchTerm.trim() === '') {
      // Reset to original data if search is cleared
      this.currentData = [...this.tableConfig.data];
    } else {
      // Search across all filterable columns
      this.currentData = this.tableConfig.data.filter(item => {
        return this.tableConfig.columns.some(column => {
          if (column.filterable && item[column.accessor]) {
            return String(item[column.accessor])
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }
          return false;
        });
      });
    }
    
    this.currentPage = 1;
    this.renderTable();
  }
  
  showAddModal() {
    this.modalTitle.textContent = `Add New ${this.getSingularName()}`;
    this.currentItemId = null;
    
    // Create form fields based on table columns
    this.itemForm.innerHTML = '';
    this.tableConfig.columns.forEach(column => {
      if (column.accessor !== 'checkbox' && column.accessor !== 'actions') {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
        
        const label = document.createElement('label');
        label.setAttribute('for', column.accessor);
        label.textContent = column.label;
        
        let input;
        
        if (column.accessor === 'status' && this.tableId === 'orders') {
          input = document.createElement('select');
          const options = ['pending', 'in progress', 'done', 'canceled'];
          options.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option;
            optionEl.textContent = this.formatStatus(option);
            input.appendChild(optionEl);
          });
        } else {
          input = document.createElement('input');
          input.type = 'text';
          
          if (column.accessor === 'id') {
            input.value = getNewId(this.tableId);
            input.disabled = true;
          }
        }
        
        input.id = column.accessor;
        input.name = column.accessor;
        
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        this.itemForm.appendChild(formGroup);
      }
    });
    
    this.modal.classList.remove('hidden');
  }
  
  showEditModal(item) {
    this.modalTitle.textContent = `Edit ${this.getSingularName()}`;
    this.currentItemId = item.id;
    
    // Create form fields based on table columns and fill with item data
    this.itemForm.innerHTML = '';
    this.tableConfig.columns.forEach(column => {
      if (column.accessor !== 'checkbox' && column.accessor !== 'actions') {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
        
        const label = document.createElement('label');
        label.setAttribute('for', column.accessor);
        label.textContent = column.label;
        
        let input;
        
        if (column.accessor === 'status' && this.tableId === 'orders') {
          input = document.createElement('select');
          const options = ['pending', 'in progress', 'done', 'canceled'];
          options.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option;
            optionEl.textContent = this.formatStatus(option);
            if (item[column.accessor] === option) {
              optionEl.selected = true;
            }
            input.appendChild(optionEl);
          });
        } else {
          input = document.createElement('input');
          input.type = 'text';
          input.value = item[column.accessor] || '';
          
          if (column.accessor === 'id') {
            input.disabled = true;
          }
        }
        
        input.id = column.accessor;
        input.name = column.accessor;
        
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        this.itemForm.appendChild(formGroup);
      }
    });
    
    this.modal.classList.remove('hidden');
  }
  
  closeModal() {
    this.modal.classList.add('hidden');
    this.currentItemId = null;
  }
  
  saveItem() {
    // Collect form data
    const formData = {};
    this.tableConfig.columns.forEach(column => {
      if (column.accessor !== 'checkbox' && column.accessor !== 'actions') {
        const input = document.getElementById(column.accessor);
        if (input) {
          formData[column.accessor] = input.value;
        }
      }
    });
    
    if (this.currentItemId) {
      // Edit existing item
      const index = this.tableConfig.data.findIndex(item => item.id === this.currentItemId);
      if (index !== -1) {
        this.tableConfig.data[index] = { ...formData };
      }
    } else {
      // Add new item
      this.tableConfig.data.push({ ...formData });
    }
    
    // Update current data
    this.currentData = [...this.tableConfig.data];
    
    // Save to local storage
    saveToLocalStorage();
    
    // Close modal and refresh table
    this.closeModal();
    this.renderTable();
  }
  
  showDeleteConfirmation(item) {
    this.currentItemId = item.id;
    this.confirmModal.classList.remove('hidden');
  }
  
  closeConfirmModal() {
    this.confirmModal.classList.add('hidden');
    this.currentItemId = null;
  }
  
  deleteItem() {
    if (this.currentItemId) {
      // Remove item from data
      this.tableConfig.data = this.tableConfig.data.filter(item => item.id !== this.currentItemId);
      
      // Update current data
      this.currentData = [...this.tableConfig.data];
      
      // Save to local storage
      saveToLocalStorage();
      
      // Close modal and refresh table
      this.closeConfirmModal();
      this.renderTable();
    }
  }
  
  viewItem(item) {
    // For simplicity, we'll just show the edit modal in read-only mode
    this.modalTitle.textContent = `View ${this.getSingularName()}`;
    this.currentItemId = null;
    
    // Create form fields based on table columns and fill with item data
    this.itemForm.innerHTML = '';
    this.tableConfig.columns.forEach(column => {
      if (column.accessor !== 'checkbox' && column.accessor !== 'actions') {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
        
        const label = document.createElement('label');
        label.setAttribute('for', column.accessor);
        label.textContent = column.label;
        
        let input;
        
        if (column.accessor === 'status' && this.tableId === 'orders') {
          input = document.createElement('input');
          input.type = 'text';
          input.value = this.formatStatus(item[column.accessor] || '');
        } else {
          input = document.createElement('input');
          input.type = 'text';
          input.value = item[column.accessor] || '';
        }
        
        input.id = column.accessor;
        input.name = column.accessor;
        input.disabled = true;
        
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        this.itemForm.appendChild(formGroup);
      }
    });
    
    this.modal.classList.remove('hidden');
  }
  
  getSingularName() {
    const name = this.tableConfig.name;
    // Simple French singularization (not comprehensive)
    if (name.endsWith('s')) {
      return name.slice(0, -1);
    }
    return name;
  }
  
  formatStatus(status) {
    if (status === 'in progress') {
      return 'In progress';
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  getNestedValue(obj, accessor) {
    return accessor.split('.').reduce((acc, key) => acc && acc[key], obj);
  }
}

export default TableManager;
