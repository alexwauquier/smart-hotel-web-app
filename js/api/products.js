import config from "../../config.js";

const getProducts = async (url = null, page = 1, size = 10, containsAlcohol = null, typeId = null) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const containsAlcoholParam = "";
  const typeParam = "";

  if (containsAlcohol) {
    containsAlcoholParam = `&contains_alcohol=${containsAlcohol}`;
  }

  if (typeId) {
    typeParam = `&type_id=${typeId}`;
  }

  const response = await fetch(url || `${config.API_BASE_URL}/api/products?page=${page}&size=${size}${containsAlcoholParam}${typeParam}`, {
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

export { getProducts };
