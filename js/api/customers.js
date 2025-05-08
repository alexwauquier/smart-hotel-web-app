import config from "../../config.js";

const getCustomers = async (url = null, page = 1, size = 10, spaceId = null) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const spaceParam = "";

  if (spaceId) {
    spaceParam = `&space_id=${spaceId}`;
  }

  const response = await fetch(url || `${config.API_BASE_URL}/api/customers?page=${page}&size=${size}${spaceParam}`, {
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

export { getCustomers };
