function renderMaintenanceProfile() {
    console.log('profile clicked');
    fetch('/api/futuremaintenance', {
        method: "Get",
        headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.authToken
        }
    })
        .then(response => response.json())
        .then(data => handleScheduledMaintenance(data))
    console.log(response);
    console.log(data);
}

function handleScheduledMaintenance(data) {
    if (data.futuremaintenance.length <= 0) {
        $("#message").toggleClass("hidden");
    } else {
        for(let i = 0; i < data.futuremaintenance.length; i++) {
        $('#cards').append(`
        <li role="listitem" class="cards__item">
        
              <div class="card">
                  <div class="card__content">
                  <h3 class="tripName">${data.futuremaintenance[i].date}</h2>
                    <h4 class="flightInfo">Flight Info</h4>
                    <p>Details: ${data.futuremaintenance[i].details}</p>
                    <p>Notes: ${data.futuremaintenance[i].notes}</p>
                    <a class="edit-button" href="/maintenanceoptions.html?id=${data.futuremaintenance[i]._id}"><button class="edit-button">Edit Maintenance</button></a>
                    <button class="delete-button" id="${data.futuremaintenance[i]._id}">Delete Maintenance</button>
                  </div>
                <div/>
        
            </li>
        `);
        }
    }
}

// function renderProfile() {
//     console.log('profile clicked');
//     fetch('/api/trips', {
//         method: "Get",
//         headers: {
//             "Content-Type": "application/json",
//             authorization: "bearer " + localStorage.authToken
//         }
//     })
//         .then(response => response.json())
//         .then(data => handleTrips(data))
//         console.log(response);
//         console.log(data);
// }

// function handleTrips(data) {
//     if (data.trips.length <= 0) {
//         $("#message").toggleClass("hidden");
//     } else {
//         for(let i = 0; i < data.trips.length; i++) {
//         $('#cards').append(`
//         <li role="listitem" class="cards__item">
        
//               <div class="card">
//                   <div class="card__content">
//                   <h3 class="tripName">${data.trips[i].tripName}</h2>
//                     <h4 class="flightInfo">Flight Info</h4>
//                     <p>Boarding time: ${data.trips[i].flightInfo.boarding}</p>
//                     <p>Departure time: ${data.trips[i].flightInfo.departure}</p>
//                     <p>Arrival time: ${data.trips[i].flightInfo.arrival}</p>
//                     <p>Terminal: ${data.trips[i].flightInfo.terminal}</p>
//                     <p>Gate: ${data.trips[i].flightInfo.gate}</p>
//                     <h4 class="hotelInfo">Hotel Info</h4>
//                     <p>Hotel Name: ${data.trips[i].hotelInfo.name}</p>
//                     <p>Address: ${data.trips[i].hotelInfo.address.building} ${data.trips[i].hotelInfo.address.street} ${data.trips[i].hotelInfo.address.zipcode}</p>
//                     <p>Check-in time: ${data.trips[i].hotelInfo.checkIn}</p>
//                     <p>Check-out time: ${data.trips[i].hotelInfo.checkOut}</p>
//                     <h4 class="carRentalInfo">Car Rental Info</h4>
//                     <p>Name: ${data.trips[i].carRental.name}</p>
//                     <p>Confirmation #: ${data.trips[i].carRental.confNumber}</p>
//                     <a class="edit-button" href="/maintenanceoptions.html?id=${data.trips[i]._id}"><button class="edit-button">Edit Trip</button></a>
//                     <button class="delete-button" id="${data.trips[i]._id}">Delete Trip</button>
//                   </div>
//                 <div/>
        
//             </li>
//         `);
//         }
//     }
// }

function deleteTrip() {
    $('body').on('click', '.delete-button', event => {
        console.log("deleted");
        const id = event.target.id
        fetch(`/api/trips/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                authorization: "bearer " + localStorage.authToken
            }
        })
            .then(() => location.reload())
    })
}

function handleProfile() {
    renderMaintenanceProfile();
    //renderProfile();
    deleteTrip();
}

$(handleProfile);