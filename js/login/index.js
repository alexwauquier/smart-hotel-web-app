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

if (isTokenValid(token)) {
  Swal.fire({
    title: "Active session detected",
    text: "You are already logged in. Do you want to continue or log in again?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Continue",
    cancelButtonText: "Log in again",
    confirmButtonColor: "#30A0BD",
    cancelButtonColor: "#d33"
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../pages/dashboard.html";
    } else {
      localStorage.clear();
      sessionStorage.clear();
    }
  });
}

import { loginCustomer, loginEmployee } from "../api/auth.js";

const form = document.getElementById("login-form");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const switchPortal = document.getElementById("switch-portal");
const togglePassword = document.getElementById("togglePassword");
const eyeOpen = document.getElementById("eyeOpen");
const eyeClosed = document.getElementById("eyeClosed");

let mode = "customer"; // Valeur initiale

function updateForm() {
  if (mode === "employee") {
    input1.placeholder = "Username";
    input2.placeholder = "Password";
    input1.id = "username";
    input2.id = "password";
    form.dataset.userType = "employee";
    switchPortal.textContent = "Customer ?";
    input1.setAttribute("autocomplete", "username");
    input2.setAttribute("autocomplete", "current-password");
  } else {
    input1.placeholder = "Last Name";
    input2.placeholder = "Room Number";
    input1.id = "last-name";
    input2.id = "space-id";
    form.dataset.userType = "customer";
    switchPortal.textContent = "Employee ?";
    input1.setAttribute("autocomplete", "family-name");
    input2.setAttribute("autocomplete", "off");
  }
}

switchPortal.addEventListener("click", (e) => {
  e.preventDefault();
  mode = mode === "customer" ? "employee" : "customer";
  updateForm();
});

togglePassword.addEventListener("click", () => {
  const input = document.getElementById(form.dataset.userType === "employee" ? "password" : "space-id");
  const isVisible = input.type === "text";
  input.type = isVisible ? "password" : "text";
  eyeOpen.style.display = isVisible ? "block" : "none";
  eyeClosed.style.display = isVisible ? "none" : "block";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userType = form.dataset.userType;
  const rememberMe = document.getElementById("remember").checked;

  Swal.fire({
    title: "Logging in...",
    text: "Please wait while we verify your credentials.",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    let result, data;

    if (userType === "customer") {
      const lastName = document.getElementById("last-name").value;
      const spaceId = document.getElementById("space-id").value;

      result = await loginCustomer(lastName, spaceId);

      if (!result.data) {
        throw new Error(result);
      }
      
      data = {
        token: result.data.token,
        storage: {
          customerId: result.data.customer.id,
          firstName: result.data.customer.first_name,
          lastName: result.data.customer.last_name,
          arrivalDate: result.data.customer.arrival_date,
          departureDate: result.data.customer.departure_date,
          spaceId: result.data.customer.space.id,
          spaceName: result.data.customer.space.name,
        },
        redirect: "pages/dashboard.html",
      };

    } else if (userType === "employee") {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      result = await loginEmployee(username, password);
      data = {
        token: result.data.token,
        storage: {
          employeeId: result.data.employee.id,
          firstName: result.data.employee.first_name,
          lastName: result.data.employee.last_name,
          typeId: result.data.employee.type.id,
          typeLabel: result.data.employee.type.label,
        },
        redirect: "pages/dashboard.html",
      };
    }

    Swal.close();
    localStorage.clear();
    sessionStorage.clear();
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", data.token);
    for (const [key, value] of Object.entries(data.storage)) {
      storage.setItem(key, value);
    }

    Swal.fire({
      title: "Successful login!",
      text: "Welcome to your space.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      window.location.href = data.redirect;
    });

  } catch (error) {
    Swal.close();
    Swal.fire({
      title: "Connection failed",
      text: error.message || "An unknown error occurred",
      icon: "error",
      confirmButtonText: "Retry",
      confirmButtonColor: "#30A0BD"
    });
  }
});

// Initialisation au chargement
updateForm();
