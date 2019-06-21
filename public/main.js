function logout() {
    $('#logout').click(event => {
        console.log("logout")
        localStorage.clear();
        window.location.href = "/index.html";
    })
}

function handlePage() {
    logout();
}

$(handlePage);