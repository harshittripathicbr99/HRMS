const baseUrl = "https://localhost:7170/api/Employee";

// ✅ Login Function
function loginUser() {
  const user = $("#loginUser").val().trim();
  const pass = $("#loginPass").val().trim();

  if (!user || !pass) {
    $("#loginError").text("Please enter username and password");
    return;
  }

  $.ajax({
    url: baseUrl,
    type: "GET",
    success: function (data) {
      const emp = data.find(e => e.login === user && e.password === pass);
      if (!emp) {
        $("#loginError").text("Invalid username or password");
        return;
      }

      // Store login details in localStorage
      localStorage.setItem("user", JSON.stringify(emp));

      // Redirect by role
      if (emp.type === 0) window.location.href = "admin.html";
      else if (emp.type === 1) window.location.href = "hr.html";
      else window.location.href = "employee.html";
    },
    error: function () {
      $("#loginError").text("Server error, try again later");
    }
  });
}

// ✅ Logout
function logoutUser() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

// ✅ Get current logged-in user
function getLoggedUser() {
  return JSON.parse(localStorage.getItem("user"));
}
