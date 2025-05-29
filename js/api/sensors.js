import config from "../../config.js";

const getSensorMeasurements = async (sensorId, range = "last_24_hours") => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found in local storage.");
    return;
  }

  // Fetch data from the API
  try {
    const response = await fetch(`${config.API_BASE_URL}/api/sensors/${sensorId}/measurements?range=${range}`, {
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
    console.error("Error fetching data:", error);
    return;
  }
};

export { getSensorMeasurements };
