// document.addEventListener('DOMContentLoaded', async () => {
//     const token = localStorage.getItem('authToken');
//     console.log("line 3 main.js", token);
//     if (token) {
//         try {
//             const response = await fetch('/validate', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (response.ok) {
//                 console.log('Authenticated');
//                 window.location.href = '/flights';
//             } else {
//                 console.log('Not authenticated or token expired');
//                 window.location.href = '/signup';  // Redirect to signup page
//             }
//         } catch (err) {
//             console.error('Error fetching protected page:', err);
//         }
//     } else {
//         console.log("25 main.js")
//         window.location.href = '/signup';
//     }
// });
// console.log("main.js token" + token);
// if (token) {
//     try {
//         const response = await fetch('http://localhost:8080/', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             }
//         });
//         if (response.ok) {
//             window.location.href = '/';
//         } else {
//             // window.location.href = '/signup';
//             console.log("else block 19 main.js");
//         }
//     } catch (err) {
//         console.log("err: at line 22 main.js");
//     }
// } else {
//     console.log("error at line 25 main.js")
// }

const searchForm = document.getElementById("search-form");

const returnDateField = document.getElementById("returnfield");
const returnDateInput = document.getElementById("return-date");
const departureDateInput = document.getElementById("departure-date");
const radioBtns = document.querySelectorAll('input[name="triptype"]');


// set minimum departure date for today
const today = new Date().toISOString().split('T')[0];
document.getElementById("departure-date").setAttribute('min', today);
document.getElementById("return-date").setAttribute('min', today);

returnDateInput.addEventListener("change", validateReturnDateTest);
departureDateInput.addEventListener("change", validateReturnDate);

function validateReturnDateTest() {
    const departureDateInput = document.getElementById("departure-date");
    const returnDateInput = document.getElementById("return-date");

    // Clear previous validation state (both is-valid and is-invalid)
    returnDateInput.classList.remove("is-invalid", "is-valid");
    const invalidFeedback = returnDateInput.nextElementSibling;
    invalidFeedback.textContent = "Please choose a valid date.";

    // Ensure both dates are provided
    if (!departureDateInput.value || !returnDateInput.value) {
        return true; // Skip validation if return date is not required
    }

    // Convert to Date objects for comparison
    const departureDate = new Date(departureDateInput.value);
    const returnDate = new Date(returnDateInput.value);

    // Validate that return date is greater than departure date
    if (returnDate <= departureDate) {
        invalidFeedback.textContent = "Return date must be later than the departure date.";
        returnDateInput.classList.add("is-invalid"); // Add invalid class
        return false;
    }

    // Mark as valid if validation passes
    returnDateInput.classList.add("is-valid"); // Add valid class
    return true;
}


for (const radioBtn of radioBtns) {
    radioBtn.addEventListener('change', toggleTripType)
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

// function validateFormFields(e) {
//     if (!e.target.checkValidity()) {
//         e.preventDefault();
//         e.stopPropagation();
//     }
//     searchForm.classList.add('was-validated');
// }

function validateReturnDate(e) {
    const departureDateInput = document.getElementById("departure-date");
    const returnDateInput = document.getElementById("return-date");


    returnDateInput.classList.remove("is-invalid", "is-valid");
    const invalidFeedback = returnDateInput.nextElementSibling;
    invalidFeedback.textContent = "Please choose a valid date.";
    if (!returnDateInput.value || !departureDateInput.value) {
        return true;
    }
    const departureDate = new Date(departureDateInput.value);
    const returnDate = new Date(returnDateInput.value);
    console.log(departureDate < returnDate);

    if (returnDate <= departureDate) {
        invalidFeedback.textContent = "Return date must be later than the departure date.";
        returnDateInput.classList.add("is-invalid");
        return false;
    }

    returnDateInput.classList.add("is-valid");
    return true;

}

async function handleFlightSearch(e) {
    e.preventDefault();
    searchForm.classList.add("was-validated");
    const isValidReturnDate = validateReturnDate(e);
    if (!searchForm.checkValidity() || !isValidReturnDate) {
        e.stopPropagation();
        searchForm.classList.add('was-validated');
        return;
    }

    const data = new FormData(e.target);
    const dataObject = Object.fromEntries(data.entries());
    console.log(dataObject);

    if (!dataObject.returnDate) {
        console.log("no return ticket")
    }
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
    console.log(queryUrl);
    // const oneWayUrl = `${API_ADDRESS}${departure_city}${arrival_city}${CURRENCY}${LANGUAGE}`
    // https://serpapi.com/search.json?engine=google_flights&departure_id=YVR&arrival_id=CDG&outbound_date=2024-12-07&currency=CAD&hl=en
    // one way https://serpapi.com/search.json?engine=google_flights&departure_id=YYC&arrival_id=YVR&gl=us&hl=en&currency=USD&type=2&outbound_date=2024-12-03&adults=1
    // https://serpapi.com/search.json?engine=google_flights&departure_id=PEK&arrival_id=AUS&outbound_date=2024-12-04&return_date=2024-12-10&currency=USD&hl=en

    postReservationRequest();
}

const postReservationRequest = async () => {
    try {
        const response = await fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "test@example.com"
            })
        });
        if (response.redirected) {

            window.location.href = response.url;
        }
    } catch (err) {
        console.log(err);
    }
}


const handleFlightSelection = (e) => {
    e.preventDefault();
}



// post information to backend


// when user searches for a city,m when the hit search button, it sends q request to serp api to displa hythe data