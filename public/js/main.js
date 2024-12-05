import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../../node_modules/axios/dist/axios.js";

const searchForm = document.getElementById("search-form");
// input=date return selection
const returnDateField = document.getElementById("returnfield");
const returnDateInput = document.getElementById("return-date");
const radioBtns = document.querySelectorAll('input[name="triptype"]');


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

async function handleFlightSearch(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObject = Object.fromEntries(data.entries());
    console.log(dataObject);
    for (const key in dataObject) {
        console.log(key);
        console.log(dataObject[key]);
    }
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
}


const handleFlightSelection = (e) => {
    e.preventDefault();
}



// post information to backend


// when user searches for a city,m when the hit search button, it sends q request to serp api to displa hythe data