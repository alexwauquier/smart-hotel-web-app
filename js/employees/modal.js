import { createEmployee, updateEmployee } from "../api/employees.js";

const addEmployee = async () => {
  const data = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    username: document.getElementById('username').value,
    type_id: document.getElementById('type.label').value,
    password: "password"
  };

  try {
    const result = await createEmployee(data);

    Swal.fire({
      icon: 'success',
      title: 'Employee added',
      text: 'The employee has been successfully added.',
      timer: 2000,
      showConfirmButton: false
    });

    return result;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Add failed',
      text: `An error occurred while adding the employee: ${error.message}`,
    });

    return null;
  }
};

const saveEmployee = async (employeeId) => {
  const updatedData = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    username: document.getElementById('username').value,
    type_id: document.getElementById('type.label').value
  };

  console.log(updatedData);
  

  try {
    const result = await updateEmployee(employeeId, updatedData);

    Swal.fire({
      icon: 'success',
      title: 'Employee updated',
      text: 'The employee has been successfully updated.',
      timer: 2000,
      showConfirmButton: false
    });

    return result;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Update failed',
      text: `An error occurred while updating the employee: ${error.message}`,
    });

    return null;
  }
};

export { addEmployee, saveEmployee };
