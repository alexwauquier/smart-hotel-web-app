import config from "../../config.js";

const getProducts = async (url = null, page = 1, size = 10, containsAlcohol = null, typeId = null) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage or sessionStorage.");
    return null;
  }

  const params = new URLSearchParams({ page, size });

  if (containsAlcohol !== null) {
    params.append("contains_alcohol", containsAlcohol);
  }

  if (typeId !== null) {
    params.append("type_id", typeId);
  }

  const finalUrl = url || `${config.API_BASE_URL}/api/products?${params.toString()}`;

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
    console.error("Error fetching products:", error.message);
    return null;
  }
};

export { getProducts };
