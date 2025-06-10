import { updateCustomer } from "../api/customers.js";

const formatDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  if (!day || !month || !year) return '';
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const saveCustomer = async (customerId) => {
  const updatedData = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    arrival_date: formatDate(document.getElementById('arrival_date').value),
    departure_date: formatDate(document.getElementById('departure_date').value),
    space_id: parseInt(document.getElementById('space.id').value)
  };

  try {
    const result = await updateCustomer(customerId, updatedData);

    Swal.fire({
      icon: 'success',
      title: 'Customer updated',
      text: 'The customer has been successfully updated.',
      timer: 2000,
      showConfirmButton: false
    });

    return result;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Update failed',
      text: `An error occurred while updating the customer: ${error.message}`,
    });

    return null;
  }
};

export default saveCustomer;
