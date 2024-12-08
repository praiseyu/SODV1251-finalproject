const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("login-error-msg");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
loginForm.addEventListener("submit", handleLogin);

async function handleLogin(e) {
    e.preventDefault();
    const email = emailField.value.trim();
    const password = passwordField.value.trim();
    const userData = { email, password };

    emailField.classList.remove("is-invalid");
    passwordField.classList.remove("is-invalid");
    errorMsg.classList.add("d-none");

    try {
        const login = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
            credentials: "same-origin",
        });
        const response = await login.json();
        if (!login.ok) {
            displayErrorMessage("Invalid credentials. Try again.");
            return;
        }
        alert("Login successful!");
        window.location.href = response.redirect;

    } catch (err) {
        console.error("Error during login:", err);
        alert("An error occurred. Please try again.");
    }
}

function displayErrorMessage(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove("d-none");
}