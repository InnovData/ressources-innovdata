"use strict";

window.onload = function() {
    const bookings = [
        {
            id: 1,
            day: "2023-06-30",
            slot: ["09:00", "11:00", "12:00", "14:00", "16:00"]
        },
        {
            id: 2,
            day: "2023-06-25",
            slot: ["12:30", "10:45", "09:45", "12:45", "11:45", "10:00"]
        },
        {
            id: 3,
            day: "2023-06-28",
            slot: ["08:30", "10:00"]
        },
        {
            id: 4,
            day: "2023-06-03",
            slot: ["08:30", "10:00"]
        },
        {
            id: 5,
            day: "2023-06-26",
            slot: [
                "08:30",
                "10:30",
                "11:30",
                "12:30",
                "13:30",
                "14:00",
                "15:00",
                "16:00"
            ]
        }
    ];

    // Fonction de formatage de la date en FR
    function formatDate(date) {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        const dateFormat = date.toLocaleDateString("fr-FR", options);
        return dateFormat;
    }

    // Fonction de désactivation personnalisée sauf les dates du tableau bookings
    function disableDate(date) {
        const enableDates = []; // Dates à activer
        // Boucle sur les dates
        bookings.forEach(booking => {
            let date = new Date(booking.day);
            enableDates.push(formatDate(date));
        });

        if (!enableDates.includes(formatDate(date))) {
            return true;
        }
    }

    // Génère les boutons de réservation d'horaires suivant le jour sélectionné
    function generateBookingButtons(selectedDates) {
        const bookingButtonsDiv = document.getElementById("booking__buttons");
        bookingButtonsDiv.innerHTML = "";
        const msgDiv = document.getElementById("booking__msg");
        msgDiv.classList.add("alert--warning", "booking__alert", "flex");
        msgDiv.innerHTML = "";

        if (selectedDates) {
            const now = new Date(); // Récupération de la date actuelle
            let closestDate = null;
            let closestDateDiff = Infinity;

            bookings.forEach(booking => {
                const bookingDate = new Date(booking.day);
                const diff = bookingDate - now;

                if (diff > 0 && diff < closestDateDiff) {
                    closestDate = bookingDate;
                    closestDateDiff = diff;
                }
            });

            const date = new Date(selectedDates);
            const msg = msgAlert(closestDate);
            bookings.forEach(booking => {
                if (formatDate(new Date(booking.day)) === formatDate(date)) {
                    booking.slot.forEach(time => {
                        const bookingButton = createBookingButton(time);
                        bookingButtonsDiv.appendChild(bookingButton);
                    });
                }
            });
            msgDiv.appendChild(msg);
        }
    }

    // Génère le message d'alerte sur le jour sélectionné
    function generateMsg(selectedDates) {
        const msgDiv = document.getElementById("booking__msg");
        msgDiv.innerHTML = "";
        if (selectedDates.length === 1) {
            const selectedDate = selectedDates[0];
            const msg = msgAlert(selectedDate);
            msgDiv.classList.remove("hidden");
            msgDiv.appendChild(msg);
        }
    }

    // Crée un bouton de réservation
    function createBookingButton(time) {
        const button = document.createElement("button");
        button.className = "booking__btn";
        button.innerText = `${time}`;

        button.addEventListener("click", function() {
            // AddEventListener à paramétrer au besoin
            alert("Créneau réservé");
        });
        return button;
    }

    // Crée un message d'alerte
    function msgAlert(day) {
        const msg = document.createElement("p");
        const date = formatDate(day);
        msg.innerText = `Sélectionner un horaire pour le ${date}`;

        return msg;
    }

    // Date par defaut la plus petite du tableau bookings
    function defaultDate() {
        const sortedBookings = bookings.sort(
            (a, b) => new Date(a.day) - new Date(b.day)
        );
        const firstBooking = sortedBookings[0];
        generateBookingButtons(firstBooking.day);
    }

    const pickr = document.querySelector(
        "#booking__picker ~ .flatpickr-calendar"
    );
    pickr.classList.add("booking__picker");
};
