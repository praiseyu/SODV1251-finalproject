// get HTML elements
const searchForm = document.getElementById("search-form");
const returnDateField = document.getElementById("returnfield");
const returnDateInput = document.getElementById("return-date");
const departureDateInput = document.getElementById("departure-date");
const radioBtns = document.querySelectorAll("input[name='triptype']");
const logoutBtn = document.getElementById("logout-btn");
const userName = document.getElementById("user-name");
const today = new Date().toISOString().split("T")[0];
document.getElementById("departure-date").setAttribute("min", today);
document.getElementById("return-date").setAttribute("min", today);

// event listeners
returnDateInput.addEventListener("change", validateReturnDate);
departureDateInput.addEventListener("change", validateReturnDate);
document.addEventListener("DOMContentLoaded", getUserDetails);
for (const radioBtn of radioBtns) {
    radioBtn.addEventListener("change", toggleTripType)
};
searchForm.addEventListener("submit", handleFlightSearch);
logoutBtn.addEventListener("click", handleLogout);

// functions below
async function getUserDetails() {
    try {
        const response = await fetch('/user');
        if (!response.ok) {
            console.error("Failed to get user details");
        }
        const data = await response.json();
        userName.innerText = `Hi, ${data.name}`;

    } catch (err) {
        console.error(`Error getting user details: ${err}`);
    }
}

function validateReturnDate() {
    returnDateInput.classList.remove("is-invalid", "is-valid");
    const invalidFeedback = returnDateInput.nextElementSibling;
    invalidFeedback.textContent = "Please choose a valid date.";

    if (!departureDateInput.value || !returnDateInput.value) {
        return true;
    }

    const departureDate = new Date(departureDateInput.value);
    const returnDate = new Date(returnDateInput.value);

    if (returnDate <= departureDate) {
        invalidFeedback.textContent = "Return date must be later than the departure date.";
        returnDateInput.classList.add("is-invalid");
        return false;
    }

    returnDateInput.classList.add("is-valid");
    return true;
}



function toggleTripType(e) {
    if (e.target.id === "oneway") {
        returnDateField.classList.add("d-none");
        returnDateInput.setAttribute("disabled", true);

    } else {
        returnDateField.classList.remove("d-none");
        returnDateInput.removeAttribute("disabled");
    }
}

async function handleFlightSearch(e) {
    e.preventDefault();
    searchForm.classList.add("was-validated");
    const isValidReturnDate = validateReturnDate(e);
    if (!searchForm.checkValidity() || !isValidReturnDate) {
        e.stopPropagation();
        searchForm.classList.add("was-validated");
        return;
    }

    const data = new FormData(e.target);
    const dataObject = Object.fromEntries(data.entries());
    postReservationRequest(dataObject);
}

async function postReservationRequest(reservation) {
    try {
        const response = await fetch("http://localhost:8080/flights", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reservation)
        });
        if (response.redirected) {
            window.location.href = response.url;
        }
    } catch (err) {
        console.error(err);
    }
}

async function handleLogout() {
    try {
        const response = await fetch("/logout", {
            method: "POST",
            credentials: "same-origin",
        });

        if (response.ok) {
            alert("Logged out successfully!");
            window.location.href = "/login";
        } else {
            alert("Logout failed. Please try again.");
        }
    } catch (err) {
        console.error("Error logging out:", err);
        alert("An error occurred during log out.");
    }
}