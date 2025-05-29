import config from "../../config.js";

const fetchDataHum = async (range = "last_24_hours") => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found in local storage.");
    return;
  }

  // Fetch data from the API
  try {
    const response = await fetch(`${config.API_BASE_URL}/api/sensors/2/measurements?range=${range}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching humidity data:", error);
    return;
  }
};

const fetchDataTemp = async (range = "last_24_hours") => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found in local storage.");
    return;
  }

  // Fetch data from the API
  try {
    const response = await fetch(`${config.API_BASE_URL}/api/sensors/1/measurements?range=${range}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching temperature data:", error);
    return;
  }
};

export { fetchDataHum, fetchDataTemp };
