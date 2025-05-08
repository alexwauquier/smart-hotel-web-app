import config from "../../config.js";

const loginCustomer = async (lastName, spaceId) => {
  const response = await fetch(`${config.API_BASE_URL}/api/auth/login/customer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      last_name: lastName,
      space_id: spaceId
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error.message);
  }

  return result.data;
};

const loginEmployee = async (username, password) => {
  const response = await fetch(`${config.API_BASE_URL}/api/auth/login/employee`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error.message);
  }

  return result.data;
};

export { loginCustomer, loginEmployee };
