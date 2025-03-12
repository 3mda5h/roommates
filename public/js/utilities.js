import axios from "axios";

document.addEventListener("DOMContentLoaded", loadTable); // Load saved rows on page load

//function is called right before the page re-loads
window.addEventListener("beforeunload", 
    saveTable
  );

//loads table data from local storage, this function is called whenever the page is refreshed/loaded
function loadTable() 
{
    let table = document.getElementById("utility-table").getElementsByTagName("tbody")[0];
    let savedRows = JSON.parse(localStorage.getItem("utility-table")) || []; //if local storage is empty (null), will create an empty array

    savedRows.forEach(rowData => {
        let row = table.insertRow();
        row.insertCell(0).innerHTML = '<input type="text" id="utility-name" placeholder="Enter utility name">';
        row.cells[0].querySelector("#utility-name").value = rowData.utility;
        row.insertCell(1).innerHTML = '<input type="text" id="person-name" placeholder="Enter person name">';
        row.cells[1].querySelector("#person-name").value = rowData.person;
        row.insertCell(2).innerHTML = '<input type="number" id="amount" placeholder="Enter amount">';
        row.cells[2].querySelector("#amount").value = rowData.amount;
    });
}

function addUtility() 
{
    let table = document.getElementById("utility-table").getElementsByTagName("tbody")[0];

    let newRow = table.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    cell1.innerHTML = '<input type="text" id="utility-name" placeholder="Enter utility name" autofocus>';
    cell2.innerHTML = '<input type="text" id="person-name" placeholder="Enter who pays">';
    cell3.innerHTML = '<input type="number" id="amount" placeholder="Enter amount">';
}

//saves current table data in local storage using JSON
function saveTable() 
{
    let table = document.getElementById("utility-table").getElementsByTagName("tbody")[0];
    let rows = [];

    for (let row of table.rows) 
    {
        let utility = row.cells[0].querySelector("#utility-name").value;
        console.log("utility name is: ", utility);
        let person = row.cells[1].querySelector("#person-name").value;
        let amount = row.cells[2].querySelector("#amount").value;
        rows.push({ utility, person, amount });
    }

    localStorage.setItem("utility-table", JSON.stringify(rows));
}

//calls the utilities microservice
async function calculateUtilities() {   
    const response = await axios.post("http://127.0.0.1:8000/utilitiesCalculator",
        [
            {"name": "almog","utility": "water","amount": 120},
            {"name": "kabir","utility": "none","amount": 0},
            {"name": "Jemma", "utility": "electricy", "amount": 160},
            {"name": "Emily", "utility": "wifi", "amount": 35},
            {"name": "Fitz", "utility": "none", "amount": 0}
        ]
    );
    console.log(response.data);
}