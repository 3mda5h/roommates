document.addEventListener("DOMContentLoaded", loadTable); // Load saved rows on page load

//loads table data from local storage, this function is called whenever the page is refreshed/loaded
function loadTable() 
{
    let table = document.getElementById("shopping-list").getElementsByTagName("tbody")[0];
    let savedRows = JSON.parse(localStorage.getItem("shopping-list")) || []; //if local storage is empty (null), will create an empty array

    savedRows.forEach(rowData => {
        let row = table.insertRow();
        row.insertCell(0).innerHTML = '<input type="checkbox" onclick="toggleRow(this)">';
        row.insertCell(1).innerText = rowData.item;
        row.insertCell(2).innerHTML = rowData.person;
    });
}

//changes color of table row when it is selected
function toggleRow(checkbox) 
{
    let row = checkbox.parentElement.parentElement; // Get the <tr> (table row)
    row.classList.toggle("selected", checkbox.checked);
}

//opens (makes visible) the popup with the given ID 
function openPopup(id) 
{
    document.getElementById(id).style.display = "block"; //makes it visible
    if(id === 'add-item-popup') 
    {
        console.log("called");
        document.getElementById('new-item-input').focus();
    }
    document.getElementById("overlay").style.display = "block";
    if(id === 'remove-item-popup')
    {
        let checkedItems = getCheckedItems();
        for(let i = 0; i < checkedItems.length; i++)
        {
            document.getElementById('remove-item-message').textContent += " \"" + checkedItems[i] + "\"";
            //this is for adding apporpriate amount of commas and "and"
            if(i === (checkedItems.length - 2)) //have reached 2nd to last element in list
            {
                document.getElementById('remove-item-message').textContent += " and";
            }
            else if(i != (checkedItems.length - 1)) 
            {
                document.getElementById('remove-item-message').textContent += ", ";
            }
        }
        document.getElementById('remove-item-message').textContent += "?";
    }
}

//closes the popup with the given ID
function closePopup(id) 
{
    document.getElementById(id).style.display = "none"; //makes it inivisible
    document.getElementById("overlay").style.display = "none";

    if(id === 'remove-item-popup') 
    {
        let selector = "#" + id + " h3";
        document.querySelector(selector).innerHTML = "Are you sure you want to remove item(s)";
    }
}

//adds a row to the HTML table containing item name and username of person that added item
function addItem() 
{
    let input = document.getElementById("new-item-input").value.trim();
    if (input === "") 
    {
        alert("Please enter an item name!");
        return;
    }

    let table = document.getElementById("shopping-list").getElementsByTagName("tbody")[0];

    let newRow = table.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    cell1.innerHTML = '<input type="checkbox" onclick="toggleRow(this)">';
    cell2.textContent = input;
    cell3.textContent = localStorage.getItem("username");

    document.getElementById("new-item-input").value = ""; // Clear input field
    closePopup('add-item-popup');
    saveTable();
}

//checks if remove is valid (there are items in the list, at least 1 item is checked, and user confirms ok to remove)
function checkRemove() 
{
    let table = document.getElementById("shopping-list").getElementsByTagName("tbody")[0]; 
    let rows = table.getElementsByTagName("tr"); 
    
    if(rows.length === 0)
    {
        alert("There are no items in the list!");
        return;
    } 

    //check if at least 1 item is checked
    let checkedItems = getCheckedItems();
    if(checkedItems.length == 0)
    {
        alert("You must select at least 1 item!");
        return;
    }

    openPopup('remove-item-popup');
}

//deletes the currently selected rows from the HTML table
function removeSelectedItems()
{
    closePopup('remove-item-popup');
    let table = document.getElementById("shopping-list").getElementsByTagName("tbody")[0]; 
    let rows = table.getElementsByTagName("tr"); 
    
    // Loop from the end because we change size of array as we delete I think
    for (let i = rows.length - 1; i >= 0; i--)
    {
        let checkbox = rows[i].getElementsByTagName("input")[0]; 
        if (checkbox && checkbox.checked) 
        {
            table.deleteRow(i); 
        }
    }
    saveTable();
}

//finds all the items in the shopping list that are checked, then returns the item names in an array
function getCheckedItems()
{
    let table = document.getElementById("shopping-list").getElementsByTagName("tbody")[0]; 
    let rows = table.getElementsByTagName("tr"); 
    
    let checkedItems = [];

    for(let i = 0; i < rows.length; i++)
    {
        let checkbox = rows[i].getElementsByTagName("input")[0];
        let itemName = rows[i].cells[1].textContent; 
        if (checkbox && checkbox.checked) 
        {
            checkedItems.push(itemName);
        }
    }
    return checkedItems;
}

//saves current table data in local storage using JSON
function saveTable() {
    let table = document.getElementById("shopping-list").getElementsByTagName("tbody")[0];
    let rows = [];

    for (let row of table.rows) 
    {
        let item = row.cells[1].innerText;
        let person = row.cells[2].innerText;
        rows.push({ item, person });
    }

    localStorage.setItem("shopping-list", JSON.stringify(rows));
}

//send data to mircoservice!!!
sendData()
{

}