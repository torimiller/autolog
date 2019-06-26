'use strict'

let tripId
let futureMaintenanceId
let completedMaintenanceId
function watchlandingPage() {
    $('#start-button').click(event => {
        $('.header-content').hide();
        $('main').html(`
        <div class="signin-register">

            <form class="signin-form">
            <h2 class="header">Log In</h2>
            <input class="form-input"id="username" type="text" name="username" placeholder="Username"/><br /><br />
            <input class="form-input" id="password" type="password" name="password" placeholder="Password" /><br /><br />
            <button class="login-button"type="submit">Log In</button><br /><br />
            
            Don't have account?<a href="/register.html" class="register" style="font-family:'Play', sans-serif;">&nbsp;Sign Up</a>
            
            </form>
            </div>`);
    });
$("#demo-button").click(event => {
    fetch('/api/auth/login', {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "demo1",
            password: "demo123456"
        })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.authToken = data.authToken
        window.location = 'maintenanceoptions.html'
    })
});
}


function watchLoginForm() {
    $('body').on('submit', '.signin-form', event => {
        console.log('clicked');
        event.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        fetch('/api/auth/login', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            .then(response => response.json())
            .then(data => {
                localStorage.authToken = data.authToken
                window.location = 'maintenanceoptions.html'
            })
    });
}

function watchRegisterForm() {
    $('.register-form').submit(event => {
        event.preventDefault();
        const username = $('#userName').val();
        const password = $('#password').val();
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        fetch('/api/users', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    firstName,
                    lastName,
                    password
                })
            })
            .then(response => response.json())
            .then(data => {
                fetch('/api/auth/login', {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    localStorage.authToken = data.authToken
                    window.location = 'maintenanceoptions.html'
                })
            })
    })
}

//MAINTENANCE OPTIONS
function hideAllSubMaintenance() {
    $('.h1Maintenance').attr('style', 'margin-top:-25px');
    $('.sub-maintenance-fluids').hide();
    $('.sub-maintenance-filters').hide();
    $('.sub-maintenance-tires').hide();
    $('.sub-maintenance-lights').hide();
    $('.sub-maintenance-cleaning').hide();
    $('.sub-maintenance-oil').hide();
}

function handleClickMaintenanceFluid() {
    $('.maintenance-options-buttons-container').on('click', '.fluids-button', event => {
        $('.sub-maintenance-options-buttons-container').show();
        $('.go-back').show();
        $('.sub-maintenance-fluids').show();
        $('.maintenance-options-buttons-container').hide();
    });
}


// MAINTENANCE OPTIONS BACK BUTTON
function handleBackButtonClick() {
    $('.go-back').click(event => {
        $('.go-back').hide();
        //$('.h1Maintenance').attr('style', 'margin-top:20px');
        $('.sub-maintenance-options-buttons-container').hide();
        $('.maintenance-options-buttons-container').show();
    })
}


// SUB-MAINTENANCE OPTIONS
function generateFutureDate() {
    return `
        <label id="future-date-label">Date to be Completed</label>
        <br>
        <input class="future-date" type="date">`
}

function generateNotesField() {
    return `
        <label id="notes-label">Notes</label>
        <br>
        <textarea name="textfield" class="notes-textarea"></textarea>
    `;
}


function handleClickSubMaintenanceFluid() {
    $('.sub-maintenance-options-buttons-container').on('click', '.fluid-details-button', event => {
        let clickedItem = $(event.target).text();
        $('.intro-heading').text('Schedule Future Maintenance');
        $('.go-back').hide();
        $('.sub-maintenance-fluids').hide();
        $('.sub-maintenance-options-buttons-container').append(`
            <h2 class="subMaintenanceH2"><span class="maintenanceItem">Fluids</span>: <span class="clickedItem">${clickedItem}</span></h2>
            <div class="subMaintenanceForm">
                <form role="form" class="scheduledMaintenanceForm" action="">
                    <fieldset>
                    ${generateFutureDate()}
                    <br>
                    ${generateNotesField()}
                    <button class="button-add-future-maintenance" type="submit">Schedule Future Maintenance</button>
                    <button class="button-cancel-future-fluid" type="submit">Cancel</button>
                    </fieldset>
                </form>
            </div>
        `);
    });
}

function handleClickCancelSubFluid() {
    $('.sub-maintenance-options-buttons-container').on('click', '.button-cancel-future-fluid', event => {
        $('.go-back').show();
        $('.intro-heading').text('Maintenance Options');
        $('.sub-maintenance-fluids').show();
        $('.subMaintenanceH2').remove();
        $('.subMaintenanceForm').remove();
        $('.button-add-future-maintenance').remove();
        $('.button-cancel-future-fluid').remove();
    });    
}


/* SUBMIT FUTURE MAINTENANCE */
function submitFutureMaintenance() {
    $('body').on('submit', '.scheduledMaintenanceForm', event => {
        event.preventDefault();
        const date = $('.sub-maintenance-options-buttons-container').find('.future-date').val();
        console.log(date);
        const maintenance = $('.sub-maintenance-options-buttons-container').find('.maintenanceItem').val();
        console.log(maintenance);
        const details = $('.sub-maintenance-options-buttons-container').find('.clickedItem').text();
        console.log(details);
        const notes = $('.sub-maintenance-options-buttons-container').find('.notes-textarea').val();
        console.log(notes);
        const futureObj = {
            date,
            maintenance,
            details,
            notes
        }
        console.log(futureObj);

       if (futureMaintenanceId) {
        futureObj.id = futureMaintenanceId
        fetch(`/api/futuremaintenance/${futureMaintenanceId}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "bearer " + localStorage.authToken
                },
                body: JSON.stringify(futureObj)
            })
            .then(() => window.location = "profile.html")
        }
        else {
            fetch('/api/futuremaintenance', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "bearer " + localStorage.authToken
                },
                body: JSON.stringify(futureObj)
            })
            .then(response => response.json())
            .then(() => window.location = "profile.html")
        }
        console.log('submit future maintenance ran');
        console.log('it really ran');
    });
}

function loadFutureMaintenanceById() {
    const split = window.location.href.split("=") 
    if (split.length == 1) {
        return 
    }
    const id = split[1]
    futureMaintenanceId = id;
    console.log(id);
    fetch(`/api/futuremaintenance/${id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.authToken
        }
    })
    .then(response => response.json())
    .then(futuremaintenance => {
        $('.logo').hide();
        $('.pageintro').hide();
        $('.maintenance-form').show();
        console.log('maintenance form appears');
        $('.future-date').val(futuremaintenance.date);
        $('.clickedItem').text(futuremaintenance.details);
        $('.notes-textarea').val(futuremaintenance.notes);
        console.log(futuremaintenance.date);
        console.log(futuremaintenance.details);
        console.log(futuremaintenance.notes);
        $('.maintenance-form').append(`
            <form class="maintenanceForm" action="">

            <legend class="formText">Any changes to this maintenance item?</legend>
            <label for="date" class="future-date">Date</label>
            <input  class="date-input" class="future-date" type="date" value="${futuremaintenance.date}">

            <label for="maintenance-type" class="clickedItem">Maintenance Type </label>
            <input  class="maintenance-input" class="clickedItem" type="text" value="${futuremaintenance.details}">

            <label for="notes">Notes</label>
            <input  class="notes-input" class="notes-textarea" type="text" value="${futuremaintenance.notes}">

            <button class="submit-complete-button" type="submit">Mark as Completed</button>

    </form>
        `)
        console.log('form has been appended to section');
    })
    console.log('loadFutureMaintenanceById() has finished');
}



/* SUBMIT COMPLETED MAINTENANCE */

function submitCompletedMaintenance() {
    $('body').on('submit', '.maintenanceForm', event => {
        event.preventDefault();
        const date = $('.maintenanceForm').find('.date-input').val();
        console.log(date);
        debugger;
        const details = $('.maintenanceForm').find('.maintenance-input').val();
        console.log(details);
        const notes = $('.maintenanceForm').find('.notes-input').val();
        console.log(notes);
        const completedObj = {
            date,
            details,
            notes
        }
        console.log(completedObj);
        debugger;
        if (completedMaintenanceId) {
            completedObj.id = completedMaintenanceId
            fetch(`/api/completedmaintenance/${completedMaintenanceId}`, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "bearer " + localStorage.authToken
                    },
                    body: JSON.stringify(completedObj)
                })
                .then(() => window.location = "completed.html")
            }
            else {
                fetch('/api/completedmaintenance', {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "bearer " + localStorage.authToken
                    },
                    body: JSON.stringify(completedObj)
                })
                .then(response => response.json())
                .then(() => window.location = "completed.html")
            }
    });
}

function loadCompletedeMaintenanceById() {
    const split = window.location.href.split("=") 
    if (split.length == 1) {
        return 
    }
    const id = split[1]
    completedMaintenanceId = id;
    console.log(id);
    fetch(`/api/completedmaintenance/${id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.authToken
        }
    })
    .then(response => response.json())
    // .then(completemaintenanceevent => {
    //     $('.scheduledDate').text(completemaintenanceevent.date);
    //     $('.subMaintenanceResult').text(completemaintenanceevent.details);
    //     $('.maintenanceNotes').text(completedmaintenanceevent.notes);
    //     console.log(completedmaintenanceevent.date);
    //     console.log(completedmaintenanceevent.details);
    //     console.log(completedmaintenanceevent.notes);
    //     console.log('load completed maintenance by ID ran');
    // })
}


// function submitCompletedMaintenance() {
//     $('body').on('click', '.submit-complete-button', event => {
//         // when clicking on “Mark as Completed”, go to new screen w/ this future maintenance event 
//         //id as the form. At the bottom of the form, you can choose “completed” or “cancel”
//         const date = $('.card__content').find('.scheduledDate').text();
//         console.log(date);
//         const details = $('.card__content').find('.subMaintenanceResult').text();
//         console.log(details);
//         const notes = $('.card__content').find('.maintenanceNotes').text();
//         console.log(notes);
//         const completedObj = {
//             date,
//             details,
//             notes
//         }
//         console.log(completedObj);
        // if (completedMaintenanceId) {
        //     completedObj.id = completedMaintenanceId
        //     fetch(`/api/completedmaintenance/${completedMaintenanceId}`, {
        //             method: "put",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 authorization: "bearer " + localStorage.authToken
        //             },
        //             body: JSON.stringify(completedObj)
        //         })
        //         .then(() => window.location = "completed.html")
        //     }
        //     else {
        //         fetch('/api/completedmaintenance', {
        //             method: "post",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 authorization: "bearer " + localStorage.authToken
        //             },
        //             body: JSON.stringify(completedObj)
        //         })
        //         .then(response => response.json())
        //         .then(() => window.location = "completed.html")
        //     }
        // console.log('submitCompletedMaintenance function ran');
        // console.log('test');
//      });
//  }

// function loadCompletedeMaintenanceById() {
//     const split = window.location.href.split("=") 
//     if (split.length == 1) {
//         return 
//     }
//     const id = split[1]
//     completedMaintenanceId = id;
//     console.log(id);
//     fetch(`/api/completedmaintenance/${id}`, {
//         method: "get",
//         headers: {
//             "Content-Type": "application/json",
//             authorization: "bearer " + localStorage.authToken
//         }
//     })
//     .then(response => response.json())
//     .then(completemaintenanceevent => {
//         $('.scheduledDate').text(completemaintenanceevent.date);
//         $('.subMaintenanceResult').text(completemaintenanceevent.details);
//         $('.maintenanceNotes').text(completedmaintenanceevent.notes);
//         console.log(completedmaintenanceevent.date);
//         console.log(completedmaintenanceevent.details);
//         console.log(completedmaintenanceevent.notes);
//         console.log('load completed maintenance by ID ran');
//     })
// }




// function addNewtrip() {
//     $('.trip-button').click(function (event) {
//         console.log("clicked");
//         $('.pageintro').hide();
//         $('.logo').hide();
//         $('.trip-form').show();
//     });
// }

// function submitTrip() {
//     $('body').on('submit', '.tripForm', event => {
//         event.preventDefault();
//         console.log('submit');
//         const tripName = $('#tripName').val();
//         const boarding = $('#boarding').val();
//         const departure = $('#departure').val();
//         const arrival = $('#arival').val();
//         const terminal = $('#terminal').val();
//         const gate = $('#gate').val();
//         const hotelName = $('#hotelName').val();
//         const building = $('#building').val();
//         const street = $('#street').val();
//         const zipcode = $('#zipcode').val();
//         const checkIn = $('#check-in').val();
//         const checkOut = $('#check-out').val();
//         const carRental = $('#carRental-name').val();
//         const confirmation = $('#confirmation').val();
//         const activeName = $('#activeName').val();
//         const activeDate = $('#activeDate').val();
//         const activeTime = $('#activeTime').val();
//         const tripObj = {
//             tripName,
//             flightInfo: {
//                 boarding,
//                 departure,
//                 arrival,
//                 terminal,
//                 gate
//             },
//             hotelInfo: {
//                 name: hotelName,
//                 address: {
//                     building,
//                     street,
//                     zipcode
//                 },
//                 checkIn,
//                 checkOut
//             },
//             carRental: {
//                 name: carRental,
//                 confNumber: confirmation
//             },
//             activities: [{
//                 name: activeName,
//                 date: activeDate,
//                 time: activeTime
//             }]
//         }

//        if (tripId) {
//         tripObj.id = tripId
//         fetch(`/api/trips/${tripId}`, {
//                 method: "put",
//                 headers: {
//                     "Content-Type": "application/json",
//                     authorization: "bearer " + localStorage.authToken
//                 },
//                 body: JSON.stringify(tripObj)
//             })
//             .then(() => window.location = "profile.html")
//         }
//         else {
//             fetch('/api/trips', {
//                 method: "post",
//                 headers: {
//                     "Content-Type": "application/json",
//                     authorization: "bearer " + localStorage.authToken
//                 },
//                 body: JSON.stringify(tripObj)
//             })
//             .then(response => response.json())
//             .then(() => window.location = "profile.html")
//         }
//     });
// }

// function loadTripById() {
//     const split = window.location.href.split("=") 
//     if (split.length == 1) {
//         return 
//     }
//     const id = split[1]
//     tripId = id;
//     console.log(id);
//     fetch(`/api/trips/${id}`, {
//         method: "get",
//         headers: {
//             "Content-Type": "application/json",
//             authorization: "bearer " + localStorage.authToken
//         }
//     })
//     .then(response => response.json())
//     .then(trip => {
//         $('.logo').hide();
//         $('.pageintro').hide();
//         $('.trip-form').show();
//         $('#tripName').val(trip.tripName);
//         $('#boarding').val(trip.flightInfo.boarding);
//         $('#departure').val(trip.flightInfo.departure);
//         $('#arival').val(trip.flightInfo.arrival);
//         $('#terminal').val(trip.flightInfo.terminal);
//         $('#gate').val(trip.flightInfo.gate);
//         $('#hotelName').val(trip.hotelInfo.name);
//         $('#building').val(trip.hotelInfo.address.building);
//         $('#street').val(trip.hotelInfo.address.street);
//         $('#zipcode').val(trip.hotelInfo.address.zipcode);
//         $('#check-in').val(trip.hotelInfo.checkIn);
//         $('#check-out').val(trip.hotelInfo.checkOut);
//         $('#carRental-name').val(trip.carRental.name);
//         $('#confirmation').val(trip.carRental.confNumber);
//         // const activeName = $('#activeName').val();
//         // const activeDate = $('#activeDate').val();
//         // const activeTime = $('#activeTime').val();
//     })
// }

function handleMaintenance() {
    handleClickMaintenanceFluid();
    // handleClickMaintenanceFilter();
    // handleClickMaintenanceTire();
    // handleClickMaintenanceLights();
    // handleClickMaintenanceCleaning();
    // handleClickMaintenanceOil();
}

function handleSubMaintenance() {
    handleClickSubMaintenanceFluid();
    handleClickCancelSubFluid();
}


function handleApp() {
    watchRegisterForm();
    watchLoginForm();
    //addNewtrip();
    watchlandingPage();
    handleBackButtonClick();
    handleMaintenance();
    handleSubMaintenance();
    //submitTrip();
    submitFutureMaintenance();
    submitCompletedMaintenance();
    //loadTripById();
    loadFutureMaintenanceById();
    //loadCompletedeMaintenanceById();
}

$(handleApp);