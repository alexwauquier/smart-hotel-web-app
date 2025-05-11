import config from "../../config.js";

const getEmployees = async (url = null, page = 1, size = 10, typeId = null) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const typeParam = "";

  if (typeId) {
    typeParam = `&type_id=${spaceId}`;
  }

  const response = await fetch(url || `${config.API_BASE_URL}/api/employees?page=${page}&size=${size}${typeParam}`, {
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

export { getEmployees };
