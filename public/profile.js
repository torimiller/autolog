/* SCHEDULED MAINTENANCE */
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
}

function handleScheduledMaintenance(data) {
    console.log(data); 
    for(let i = 0; i < data.futuremaintenance.length; i++) {
    $('#scheduledCards').append(`
    <li role="listitem" class="cards__item">
    
            <div class="card">
            <div class="card__content">
                <p id="dateHeaderTop">To be Completed On:</p>
                <p class="scheduledDate">${data.futuremaintenance[i].date}</p>
                <p class="maintenanceTypeHeader">Type of Maintenance:</p>
                <p class="subMaintenanceResult">${data.futuremaintenance[i].details}</p>
                <p class="maintenanceNotesHeader">Notes:</p>
                <p class="maintenanceNotes">${data.futuremaintenance[i].notes}</p>
                <a href="/submitmaintenance.html?id=${data.futuremaintenance[i]._id}" class="check-completed-button">Mark as Completed<a>
                <button class="delete-button" id="${data.futuremaintenance[i]._id}">Delete Maintenance</button>
                </div>
            <div/>
    
        </li>
    `);
    console.log('handleScheduledMaintenance function ran');
    }
    
}


/* COMPLETED MAINTENANCE */
function renderCompletedMaintenanceProfile() {
    console.log('profile clicked');
    fetch('/api/completedmaintenance', {
        method: "Get",
        headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.authToken
        }
    })
        .then(response => response.json())
        .then(data => handleCompletedMaintenance(data))
}

function handleCompletedMaintenance(data) {
    console.log(data);
    for(let i = 0; i < data.completedmaintenance.length; i++) {
    $('#completedCards').append(`
    <li role="listitem" class="cards__item">
    
            <div class="card">
            <div class="card__content">
                <p class="completedDateHeader">Completed On:</p>
                <p class="completedDate">${data.completedmaintenance[i].date}</p>
                <p class="maintenanceTypeHeader">Type of Maintenance:</p>
                <p class="subMaintenanceResult">${data.completedmaintenance[i].details}</p>
                <p class="maintenanceNotesHeader">Notes:</p>
                <p class="maintenanceNotes">${data.completedmaintenance[i].notes}</p>
                <button class="delete-button" id="${data.completedmaintenance[i]._id}">Delete Maintenance</button>
                </div>
            <div/>
    
        </li>
    `);
    }
    
}


function deleteScheduledMaintenance() {
    $('body').on('click', '.delete-button', event => {
        console.log("deleted");
        const id = event.target.id
        fetch(`/api/futuremaintenance/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                authorization: "bearer " + localStorage.authToken
            }
        })
            .then(() => location.reload())
    })
}

function deleteCompleteddMaintenance() {
    $('body').on('click', '.delete-button', event => {
        console.log("deleted");
        const id = event.target.id
        fetch(`/api/completedmaintenance/${id}`, {
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
    renderCompletedMaintenanceProfile();
    deleteScheduledMaintenance();
    deleteCompleteddMaintenance();
}

$(handleProfile);