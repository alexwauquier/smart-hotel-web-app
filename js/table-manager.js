import tableConfig from "./table-config.js";
import config from "../config.js";

class TableManager {
  constructor(tableId) {
    this.tableId = tableId;
    this.tableConfig = tableConfig[tableId];
    this.currentData = [];
    this.filteredData = [...this.currentData];
    this.sortColumn = null;
    this.sortDirection = 'asc';
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.totalPages = 1
    this.itemsTotal = 10;
    this.filter = { column: '', value: '' };
    this.dropdownConfig = {};
    
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
    this.confirmModal = document.getElementById('confirm-modal');
    this.closeConfirmModalBtn = document.getElementById('close-confirm-modal');
    this.cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    this.confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    
    this.currentItemId = null;
    this.currentModal = null;
    
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
      if (column.showInTable === false) {
        return;
      }
      
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
          if (column.showInTable === false) {
            return;
          }

          const td = document.createElement('td');
          
          if (column.accessor === 'checkbox') {
            td.classList.add('checkbox-col');
            td.innerHTML = '<input type="checkbox">';
          } else if (column.accessor === 'actions') {
            td.classList.add('action-col');

            let dropdownHTML = '';

            if (column.view !== false) {
              dropdownHTML += `<button class="action-btn view" style="display: block; width: 100%; padding: 8px; border: none; text-align: left; cursor: pointer;">View</button>`;
            }
            if (column.edit !== false) {
              dropdownHTML += `<button class="action-btn edit" style="display: block; width: 100%; padding: 8px; border: none; text-align: left; cursor: pointer;">Edit</button>`;
            }
            if (column.delete !== false) {
              dropdownHTML += `<button class="action-btn delete" style="display: block; width: 100%; padding: 8px; border: none; text-align: left; cursor: pointer;">Delete</button>`;
            }

            td.innerHTML = `
              <div style="position: relative; display: inline-block;">
                <svg id="menu-icon" class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" 
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                </svg>
                <div id="dropdown-menu">
                  ${dropdownHTML}
                </div>
              </div>
            `;

            const icon = td.querySelector('#menu-icon');
            const dropdown = td.querySelector('#dropdown-menu');

            icon.addEventListener('click', (e) => {
              e.stopPropagation(); // empêcher que le clic remonte et ferme le menu immédiatement

              document.querySelectorAll('#dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                  menu.style.display = 'none';
                }
              });

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
            
            if (viewBtn) {
              viewBtn.addEventListener('click', () => this.viewItem(item));
            }
            if (editBtn) {
              editBtn.addEventListener('click', () => this.showEditModal(item));
            }
            if (deleteBtn) {
              deleteBtn.addEventListener('click', () => this.showDeleteConfirmation(item));
            }
          } else if (column.accessor === 'status' && this.tableId === 'orders') {
            const statusValue = item[column.accessor];
            td.innerHTML = `<span class="status ${statusValue}">${this.statusValue}</span>`;
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
  
  async showAddModal() {
    this.modalTitle.textContent = `Add New ${this.getSingularName()}`;
    this.currentModal = "add";

    await this.renderFormFields();

    this.modal.classList.remove('hidden');
  }
  
  async showEditModal(item) {
    this.modalTitle.textContent = `Edit ${this.getSingularName()}`;
    this.currentModal = "edit";

    await this.renderFormFields(item);

    this.modal.classList.remove('hidden');
  }
  
  closeModal() {
    this.modal.classList.add('hidden');
    this.currentItemId = null;
    this.currentModal = null;
  }
  
  showDeleteConfirmation(item) {
    this.currentItemId = item.id;
    this.confirmModal.classList.remove('hidden');
  }
  
  closeConfirmModal() {
    this.confirmModal.classList.add('hidden');
    this.currentItemId = null;
  }
  
  async deleteItem() {
    if (this.currentItemId) {
      console.log("Local data:", this.currentData);
      try {
        // Appel à la suppression API avec gestion du token
        const result = await this.deleteItemFromApi(this.tableId, this.currentItemId);

        if (!result) {
          throw new Error('La suppression via API a échoué.');
        }

        this.currentData = this.currentData.filter(item => item.id !== this.currentItemId);

        // Fermeture modale et rafraîchissement de la table
        this.closeConfirmModal();
        this.renderTable();
      } catch (error) {
        alert('Erreur lors de la suppression de l\'élément : ' + error.message);
        console.error(error);
      }
    }
  }
  
  viewItem(item) {
    // For simplicity, we'll just show the edit modal in read-only mode
    this.modalTitle.textContent = `View ${this.getSingularName()}`;
    this.currentItemId = null;
    this.currentModal = "view";

    // Create form fields based on table columns and fill with item data
    this.itemForm.innerHTML = '';
    this.tableConfig.columns.forEach(column => {
      if (column.accessor !== 'checkbox' && column.accessor !== 'actions') {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const label = document.createElement('label');
        label.setAttribute('for', column.accessor);
        label.textContent = column.label;

        let input = document.createElement('input');
        input.type = 'text';

        // Utiliser getNestedValue pour les champs imbriqués
        let value = this.getNestedValue(item, column.accessor) || '';

        input.value = value;
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

  async fetchDropdownOptions(apiPath) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage or sessionStorage.");
      return [];
    }

    const url = `${config.API_BASE_URL}${apiPath}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch options: ${response.statusText}`);
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
      return [];
    }
  }

  async renderFormFields(item = {}) {
    this.currentItemId = item.id || null;
    this.itemForm.innerHTML = '';

    for (const column of this.tableConfig.columns) {
      if (['checkbox', 'actions'].includes(column.accessor)) continue;

      const formGroup = document.createElement('div');
      formGroup.classList.add('form-group');

      const label = document.createElement('label');
      label.setAttribute('for', column.accessor);
      label.textContent = column.label;

      let input;

      if (this.dropdownConfig && this.dropdownConfig[column.accessor]) {
        const result = await this.fetchDropdownOptions(this.dropdownConfig[column.accessor].apiPath, this.dropdownConfig[column.accessor].responseDataPath);

        const options = this.getDataByPath(result, this.dropdownConfig[column.accessor].responseDataPath);
        input = document.createElement('select');

        options.forEach(({ id, label }) => {
          const option = document.createElement('option');
          option.value = id;
          option.textContent = label;
          input.appendChild(option);
        });

        input.value = this.getNestedValue(item, column.accessor.replace(/\.label$/, ".id")) || '';
      } else if (column.accessor === 'id') {
        input = document.createElement('input');
        input.type = 'text';
        input.disabled = true;
        input.value = this.getNestedValue(item, column.accessor) || '';
      } else {
        input = document.createElement('input');
        input.type = 'text';
        input.value = this.getNestedValue(item, column.accessor) || '';
      }

      input.id = column.accessor;
      input.name = column.accessor;

      formGroup.appendChild(label);
      formGroup.appendChild(input);
      this.itemForm.appendChild(formGroup);
    }
  }

  getSingularName() {
    const name = this.tableConfig.name;
    // Simple French singularization (not comprehensive)
    if (name.endsWith('s')) {
      return name.slice(0, -1);
    }
    return name;
  }
  
  getDataByPath(obj, pathArray) {
    return pathArray.reduce((acc, key) => acc && acc[key], obj);
  }

  getNestedValue(obj, accessor) {
    return accessor.split('.').reduce((acc, key) => acc && acc[key], obj);
  }

  async deleteItemFromApi(tableId, currentItemId) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage or sessionStorage.");
      return null;
    }

    const url = `${config.API_BASE_URL}/api/${tableId}/${currentItemId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result?.error?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error("Error fetching customers:", error.message);
      return null;
    }
  }
}

export default TableManager;
