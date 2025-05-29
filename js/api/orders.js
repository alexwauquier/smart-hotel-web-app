import config from "../../config.js";

const getOrders = async (url = null, page = 1, size = 10, statusId = null, employeeId = null) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage or sessionStorage.");
    return null;
  }

  const params = new URLSearchParams({ page, size });

  if (statusId !== null) {
    params.append("status_id", statusId);
  }

  if (employeeId !== null) {
    params.append("employee_id", employeeId);
  }

  const finalUrl = url || `${config.API_BASE_URL}/api/orders?${params.toString()}`;

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
    console.error("Error fetching orders:", error.message);
    return null;
  }
};

export { getOrders };
