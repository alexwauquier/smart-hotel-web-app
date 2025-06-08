import config from "../../config.js";

const loginCustomer = async (lastName, spaceId) => {
  const url = `${config.API_BASE_URL}/api/auth/login/customer`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        last_name: lastName,
        space_id: spaceId
      })
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result?.error?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return result;
  } catch (error) {
    console.error("Error login customer:", error.message);
    throw error;
  }
};

const loginEmployee = async (username, password) => {
  const url = `${config.API_BASE_URL}/api/auth/login/employee`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result?.error?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return result;
  } catch (error) {
    console.error("Error login employee:", error.message);
    throw error;
  }
};

export { loginCustomer, loginEmployee };
