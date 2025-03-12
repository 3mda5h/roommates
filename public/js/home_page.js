//this function is called whenever the page is loaded
//edits the display at the top of the screen to say "Hello" + username
window.onload = function() //ensures HTML is fully loaded before running javascript
{
    let storedUsername = localStorage.getItem("username");

    if(!storedUsername || storedUsername === "") window.location.href = "create_account.html";

    console.log("Retrieved username:", storedUsername);

    if (storedUsername) 
    {
        document.getElementById("userDisplay").textContent = storedUsername;
    }
}

//opens popup of given ID
function openPopup(id) 
{
    document.getElementById(id).style.display = "block"; /*makes it visible*/
    document.getElementById("overlay").style.display = "block";
} 

//closes popup of given ID
function closePopup(id) 
{
    document.getElementById(id).style.display = "none"; /*makes it visible*/
    document.getElementById("overlay").style.display = "none";
} 

//saves item that user added using + button to the local storage JSON
//this updated JSON file will be loaded the next time the user opesn the shopping list page
function saveItem()
{
    let savedRows = JSON.parse(localStorage.getItem("shopping-list")) || []; //if local storage is empty (null), will create an empty array

    let item = document.getElementById('new-item-input').value.trim();
    let person = localStorage.getItem("username");
    savedRows.push({item, person});
    localStorage.setItem("shopping-list", JSON.stringify(savedRows));

    closePopup('add-item-popup');
}

//clears the username and password data in local storage
function signOut()
{
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    window.location.href = "create_account.html";
}