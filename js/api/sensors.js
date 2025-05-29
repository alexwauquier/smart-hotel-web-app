import config from "../../config.js";

const getSensorMeasurements = async (sensorId, range = "last_24_hours") => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage or sessionStorage.");
    return null;
  }

  const url = `${config.API_BASE_URL}/api/sensors/${sensorId}/measurements?range=${range}`;

  try {
    const response = await fetch(url, {
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
    console.error("Error fetching sensor measurements:", error.message);
    return null;
  }
};

export { getSensorMeasurements };
