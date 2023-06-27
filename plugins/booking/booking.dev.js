"use strict";

window.onload = function () {
  var bookings = [{
    id: 1,
    day: "2023-06-30",
    slot: ["09:00", "11:00", "12:00", "14:00", "16:00"]
  }, {
    id: 2,
    day: "2023-06-25",
    slot: ["12:30", "10:45", "09:45", "12:45", "11:45", "10:00"]
  }, {
    id: 3,
    day: "2023-06-28",
    slot: ["08:30", "10:00"]
  }, {
    id: 4,
    day: "2023-06-03",
    slot: ["08:30", "10:00"]
  }, {
    id: 5,
    day: "2023-06-26",
    slot: ["08:30", "10:30", "11:30", "12:30", "13:30", "14:00", "15:00", "16:00"]
  }]; // Fonction de formatage de la date en FR

  function formatDate(date) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    var dateFormat = date.toLocaleDateString("fr-FR", options);
    return dateFormat;
  } // Fonction de désactivation personnalisée sauf les dates du tableau bookings


  function disableDate(date) {
    var enableDates = []; // Dates à activer
    // Boucle sur les dates

    bookings.forEach(function (booking) {
      var date = new Date(booking.day);
      enableDates.push(formatDate(date));
    });

    if (!enableDates.includes(formatDate(date))) {
      return true;
    }
  } // Génère les boutons de réservation d'horaires suivant le jour sélectionné


  function generateBookingButtons(selectedDates) {
    var bookingButtonsDiv = document.getElementById("booking__buttons");
    bookingButtonsDiv.innerHTML = "";
    var msgDiv = document.getElementById("booking__msg");
    msgDiv.classList.add("alert--warning", "booking__alert", "flex");
    msgDiv.innerHTML = "";

    if (selectedDates) {
      var now = new Date(); // Récupération de la date actuelle

      var closestDate = null;
      var closestDateDiff = Infinity;
      bookings.forEach(function (booking) {
        var bookingDate = new Date(booking.day);
        var diff = bookingDate - now;

        if (diff > 0 && diff < closestDateDiff) {
          closestDate = bookingDate;
          closestDateDiff = diff;
        }
      });
      var date = new Date(selectedDates);
      var msg = msgAlert(closestDate);
      bookings.forEach(function (booking) {
        if (formatDate(new Date(booking.day)) === formatDate(date)) {
          booking.slot.forEach(function (time) {
            var bookingButton = createBookingButton(time);
            bookingButtonsDiv.appendChild(bookingButton);
          });
        }
      });
      msgDiv.appendChild(msg);
    }
  } // Génère le message d'alerte sur le jour sélectionné


  function generateMsg(selectedDates) {
    var msgDiv = document.getElementById("booking__msg");
    msgDiv.innerHTML = "";

    if (selectedDates.length === 1) {
      var selectedDate = selectedDates[0];
      var msg = msgAlert(selectedDate);
      msgDiv.classList.remove("hidden");
      msgDiv.appendChild(msg);
    }
  } // Crée un bouton de réservation


  function createBookingButton(time) {
    var button = document.createElement("button");
    button.className = "booking__btn";
    button.innerText = "".concat(time);
    button.addEventListener("click", function () {
      // AddEventListener à paramétrer au besoin
      alert("Créneau réservé");
    });
    return button;
  } // Crée un message d'alerte


  function msgAlert(day) {
    var msg = document.createElement("p");
    var date = formatDate(day);
    msg.innerText = "S\xE9lectionner un horaire pour le ".concat(date);
    return msg;
  } // Date par defaut la plus petite du tableau bookings


  function defaultDate() {
    var sortedBookings = bookings.sort(function (a, b) {
      return new Date(a.day) - new Date(b.day);
    });
    var firstBooking = sortedBookings[0];
    generateBookingButtons(firstBooking.day);
  }

  var pickr = document.querySelector("#booking__picker ~ .flatpickr-calendar");
  pickr.classList.add("booking__picker");
};