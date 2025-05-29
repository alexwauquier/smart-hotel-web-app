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

export { getCustomers };
