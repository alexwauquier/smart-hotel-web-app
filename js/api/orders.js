import config from "../../config.js";

const getOrders = async (url = null, page = 1, size = 10, statusId = null, employeeId = null) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const statusParam = "";
  const employeeParam = "";

  if (statusId) {
    statusParam = `&contains_alcohol=${statusId}`;
  }

  if (employeeId) {
    employeeParam = `&type_id=${employeeId}`;
  }

  const response = await fetch(url || `${config.API_BASE_URL}/api/orders?page=${page}&size=${size}${statusParam}${employeeParam}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error.message);
  }

  return result;
};

export { getOrders };
