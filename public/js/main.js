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

returnDateInput.addEventListener("change", validateReturnDateTest);
departureDateInput.addEventListener("change", validateReturnDateTest);

document.addEventListener('DOMContentLoaded', async () => {
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

})

function validateReturnDateTest() {

    // reset error states
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


for (const radioBtn of radioBtns) {
    radioBtn.addEventListener("change", toggleTripType)
};
searchForm.addEventListener("submit", handleFlightSearch);



function toggleTripType(e) {
    if (e.target.id === "oneway") {
        returnDateField.classList.add("d-none");
        returnDateInput.setAttribute("disabled", true);

    } else {
        returnDateField.classList.remove("d-none");
        returnDateInput.removeAttribute("disabled");
    }
}

// function validateReturnDate(e) {
//     returnDateInput.classList.remove("is-invalid", "is-valid");
//     const invalidFeedback = returnDateInput.nextElementSibling;
//     invalidFeedback.textContent = "Please choose a valid date.";
//     if (!returnDateInput.value || !departureDateInput.value) {
//         return true;
//     }
//     const departureDate = new Date(departureDateInput.value);
//     const returnDate = new Date(returnDateInput.value);

//     if (returnDate <= departureDate) {
//         invalidFeedback.textContent = "Return date must be later than the departure date.";
//         returnDateInput.classList.add("is-invalid");
//         return false;
//     }

//     returnDateInput.classList.add("is-valid");
//     return true;

// }

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

    /// no serpapi
    const { departureDate, departureCity, arrivalCity } = dataObject;
    const departure_city = `&departure_id=${departureCity}`;
    const arrival_city = `&arrival_id=${arrivalCity}`;
    const outbound_date = `&outbound_date=${departureDate}`;
    const return_date = dataObject.returnDate ? `&return_date=${dataObject.returnDate}` : "";
    const trip_type = dataObject.triptype === "oneway" ? "&type=2" : "";

    const API_ADDRESS = `https://serpapi.com/search.json?engine=google_flights`;
    const LANGUAGE = "&hl=en";
    const CURRENCY = "&currency=CAD";
    const RETURN_DATE = "&return_date=2024-12-10";
    const OUTBOUND_DATE = "&outbound_date=2024-12-04";
    const ARRIVAL = "&arrival_id=AUS"
    const DEPARTURE = "&departure_id=PEK";

    // const request = `${API_ADDRESS}${DEPARTURE}${ARRIVAL}${OUTBOUND_DATE}${RETURN_DATE}${CURRENCY}${LANGUAGE};`
    const queryUrl = `${API_ADDRESS}${departure_city}${arrival_city}${outbound_date}${return_date}${CURRENCY}${LANGUAGE}${trip_type}`;
    // const oneWayUrl = `${API_ADDRESS}${departure_city}${arrival_city}${CURRENCY}${LANGUAGE}`
    // https://serpapi.com/search.json?engine=google_flights&departure_id=YVR&arrival_id=CDG&outbound_date=2024-12-07&currency=CAD&hl=en
    // one way https://serpapi.com/search.json?engine=google_flights&departure_id=YYC&arrival_id=YVR&gl=us&hl=en&currency=USD&type=2&outbound_date=2024-12-03&adults=1
    // https://serpapi.com/search.json?engine=google_flights&departure_id=PEK&arrival_id=AUS&outbound_date=2024-12-04&return_date=2024-12-10&currency=USD&hl=en

    postReservationRequest(dataObject);
}

const postReservationRequest = async (reservation) => {
    try {
        console.log(reservation);
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
        console.log(err);
    }
}

logoutBtn.addEventListener("click", async () => {
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
        alert("An error occurred during logout.");
    }
});