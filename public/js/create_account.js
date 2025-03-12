
//gets username and password currently written in the text field and stores these values in local storage
function createAccount() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    if (username === "" || password === "") //user didn't fill out one of the feilds
        message.textContent = "Please fill both fields!";
    else 
    {
        // Store data in localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        console.log("Stored username:", username);

        // Redirect to home page
        window.location.href = "home.html";
    }
}