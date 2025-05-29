const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    if (!exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return exp > now;
  } catch (e) {
    return false;
  }
}

const token = localStorage.getItem("token") || sessionStorage.getItem("token");

if (!isTokenValid(token)) {
  window.location.href = "../index.html";
}
