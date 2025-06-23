var loginPage = document.getElementById("loginPage");
var registerPage = document.getElementById("registerPage");
var homePage = document.getElementById("homePage");

function showLogin() {
  loginPage.classList.remove("hidden");
  registerPage.classList.add("hidden");
  homePage.classList.add("hidden");
}

function showRegister() {
  registerPage.classList.remove("hidden");
  loginPage.classList.add("hidden");
  homePage.classList.add("hidden");
}

function showHome(user) {
  loginPage.classList.add("hidden");
  registerPage.classList.add("hidden");
  homePage.classList.remove("hidden");
  document.getElementById("userName").textContent = user.name || "User"; // Fallback to 'User'
}

function validateEmail(email) {
  var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.(com|net|edu)$/;
  return re.test(email);
}

function validPass(password) {
  var pass = /^[a-zA-Z0-9._%+-]{5,30}$/;
  return pass.test(password);
}

function validName(name) {
  var ne = /^[A-Z][a-zA-Z\s'-]{2,}$/; 
  return ne.test(name);
}

// Sign Up
var registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("registerName").value.trim();
  var email = document.getElementById("registerEmail").value.trim();
  var password = document.getElementById("registerPassword").value.trim();
  var confirmPassword = document.getElementById("confirmPassword").value.trim();
  var error = document.getElementById("registerError");

  error.textContent = ""; 

  if (!validName(name)) {
    error.textContent = "Name must start with an uppercase letter and be at least 3 characters long.";
    return;
  }

  if (!validateEmail(email)) {
    error.textContent = "Invalid Email.";
    return;
  }

  if (!validPass(password)) {
    error.textContent = "Password must be 5-30 characters and contain only alphanumeric characters or symbols.";
    return;
  }

  if (password !== confirmPassword) {
    error.textContent = "Passwords do not match.";
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(u => u.email === email)) {
    error.textContent = "Email already exists.";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  showLogin();
});

// Login
var loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.getElementById("loginEmail").value.trim();
  var password = document.getElementById("loginPassword").value.trim();
  var error = document.getElementById("loginError");

  error.textContent = ""; 

  var users = JSON.parse(localStorage.getItem("users")) || [];
  var user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    error.textContent = "Invalid credentials.";
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  showHome(user);
});

// Logout
var logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  showLogin();
});
