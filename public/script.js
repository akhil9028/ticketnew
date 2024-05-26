function toggleDropdown() {
  var dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".fa-bars")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("oldbusid").textContent = idd;
  document.getElementById("here").textContent = lhere;
  document.getElementById("there").textContent = lthere;
});

var idd = getURLParameter("id");
var lhere = getURLParameter("from");
var lthere = getURLParameter("to");
console.log("bussidd " + idd);

function redirectToDailyPass() {
  window.location.href = "dailyPass.html?id=" + idd;
}
function redirectToBookTicket() {
  if (idd == 298) {
    window.location.href = "bookTicketnew.html?id=" + idd;
  } else if (idd == 250) {
    window.location.href = "route1.html?id=" + idd;
  } else if (idd == 324) {
    window.location.href = "route2.html?id=" + idd;
  } else if (idd == 100) {
    window.location.href = "route3.html?id=" + idd;
  } else if (idd == 354) {
    window.location.href = "route4.html?id=" + idd;
  } else if (id == 148) {
    window.location.href = "route5.html?id=" + idd;
  }
}

// console.log(totalFare);

// Add this function to read URL parameters
function getURLParameter(name) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

let source = document.getElementById("source");
let dest = document.getElementById("Destination");
let bus = document.getElementById("bus");

// Add this code to update the spans in confirm_booking.html
document.addEventListener("DOMContentLoaded", function () {
  // Get the values from URL parameters
  var tickets = getURLParameter("tickets");
  totalFare = getURLParameter("totalFare");

  // Update the spans in the confirm_booking.html file

  document.getElementById("ticket").textContent = tickets;
  document.getElementById("rs").textContent = totalFare;
  bus.textContent = getURLParameter("busid");
  // document.getElementById("passPrice").textContent = totalFare;
});

var btn = document.getElementById("rzp-button1");

// console.log(busId);

console.log("bussidd 2 " + getURLParameter("busid"));

async function getTickets() {
  var tickets = getURLParameter("tickets");
  var ide = getURLParameter("id");
  window.location.href =
    "passTicket.html?tickets=" +
    tickets +
    "&totalFare=" +
    totalFare +
    "&id=" +
    getURLParameter("busid");
}

// var dateElement = document.getElementById("date");
// var timeElement = document.getElementById("time");

var currentDate = new Date();

var dateString = currentDate.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
var timeString = currentDate.toLocaleTimeString("en-US");

document.addEventListener("DOMContentLoaded", function () {
  console.log("my fare = " + totalFare);
  document.getElementById("passPrice").textContent = totalFare;
  document.getElementById("bus-id").textContent = idd;
  document.getElementById("time").textContent = timeString;
  document.getElementById("date").textContent = dateString;
  document.getElementById("tckkt").textContent = getURLParameter("tickets");

  console.log(dateString);
  console.log(timeString);
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("my parameters ==" + getURLParameter("from"));
  console.log("my parameters ==" + getURLParameter("to"));
  document.getElementById("src").textContent = getURLParameter("from");
  document.getElementById("dest").textContent = getURLParameter("to");
  document.getElementById("passPrice1").textContent = getURLParameter("fare");
  document.getElementById("bus-id1").textContent = getURLParameter("id");
  document.getElementById("tkt").textContent = getURLParameter("pass");
  document.getElementById("time").textContent = timeString;
  document.getElementById("date").textContent = dateString;

  var validTime = new Date(currentDate.getTime() + 3 * 60 * 60 * 1000);
  var hours = validTime.getHours();
  var minutes = validTime.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedTime = hours + ":" + minutes + " " + ampm;
  document.getElementById("valTime").textContent = formattedTime;
});
const findMyState = () => {
  const status = document.querySelector(".status");

  const success = (position) => {
    console.log(position);

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log("latitude" + latitude);
    console.log("longitude" + longitude);

    let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";
    let apiKey = "9df256ffbf6c490ab0a4ebabee40d43b";

    const getUserCurrentAddress = async (latitude, longitude) => {
      let query = `${latitude},${longitude}`;

      let apiUrl = `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`;

      try {
        const res = await fetch(apiUrl);

        const data = await res.json();

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserCurrentAddress(latitude, longitude);
    document.getElementById("startlocation").textContent =
      "Sinhgad College,Vadgaon";
    // document.getElementById("startlocation").value = "Katraj";
  };

  const error = () => {
    status.textContent = "unable to get location";
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

document
  .getElementById("startlocation")
  .addEventListener("click", function (event) {
    // Prevent the default behavior of the button click, which is to submit a form or refresh the page
    event.preventDefault();

    // Your custom logic goes here
    console.log("Button clicked!");
  });

// document
//   .querySelector(".currentLocation")
//   .addEventListener("click", findMyState);
