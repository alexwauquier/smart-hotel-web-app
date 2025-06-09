const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp > now;
  } catch (e) {
    return false;
  }
};

const token = localStorage.getItem("token") || sessionStorage.getItem("token");

if (!isTokenValid(token)) {
  Swal.fire({
    title: "Session expired",
    text: "Your session has expired. Please log in again.",
    icon: "warning",
    confirmButtonText: "OK",
    confirmButtonColor: "#30A0BD",
    allowOutsideClick: false,
    allowEscapeKey: false
  }).then(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "../index.html";
  });
}
