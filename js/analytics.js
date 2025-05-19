async function fetchDataTemp() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in local storage.");
    return;
  }

  // Fetch data from the API
  let dataTemp;
  try {
    const response = await fetch(`https://smart-hotel-api.onrender.com/api/sensors/1/measurements?range=last_24_hours`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    dataTemp = await response.json();
    extractedDataTemp = dataTemp.data.measurements.map(measurement => ({
      temperature: measurement.value,
      timestamp: new Date(measurement.timestamp).toLocaleString()
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return;
  }

  // Log the response object

    console.log("Response object:", extractedDataTemp);
    return extractedDataTemp;

}

async function fetchDataHum() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }
  
    // Fetch data from the API
    let dataHum;
    try {
      const response2 = await fetch(`https://smart-hotel-api.onrender.com/api/sensors/2/measurements?range=last_24_hours`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }
  
      dataHum = await response2.json();
      extractedDataHum = dataHum.data.measurements.map(measurement => ({
        humidite: measurement.value,
        timestamp: new Date(measurement.timestamp).toLocaleString()
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return;
    }
  
    // Log the response object
  
      console.log("Response object:", extractedDataHum);
      return extractedDataHum;

}
