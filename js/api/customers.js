import config from "../../config.js";

const getCustomers = async (url = null, page = 1, size = 10, spaceId = null) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage or sessionStorage.");
    return null;
  }

  const params = new URLSearchParams({ page, size });

  if (spaceId !== null) {
    params.append("space_id", spaceId);
  }

  const finalUrl = url || `${config.API_BASE_URL}/api/customers?${params.toString()}`;

  try {
    const response = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
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
};

const createCustomer = async (data) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage or sessionStorage.");
    return null;
  }

  const url = `${config.API_BASE_URL}/api/customers`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result?.error?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return result;
  } catch (error) {
    console.error("Error creating customer:", error.message);
    return null;
  }
};

const updateCustomer = async (customerId, updatedData) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage or sessionStorage.");
    return null;
  }

  const url = `${config.API_BASE_URL}/api/customers/${customerId}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result?.error?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return result;
  } catch (error) {
    console.error(`Error updating customer ${customerId}:`, error.message);
    throw error;
  }
};

export { getCustomers, createCustomer, updateCustomer };
