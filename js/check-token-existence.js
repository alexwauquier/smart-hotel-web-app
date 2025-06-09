const token = localStorage.getItem("token") || sessionStorage.getItem("token");

if (!token) {
  window.location.href = "../index.html";
}
