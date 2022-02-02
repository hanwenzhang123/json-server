const baseUrl = "http://localhost:3000/events";
// get data
async function getData() {
  const response = await fetch(baseUrl);
  return response.json();
}

// post data
async function postData(data = {}) {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// put data
async function putData(id, data = {}) {
  const response = await fetch(baseUrl + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// delete data
async function deleteData(id) {
  const response = await fetch(baseUrl + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.json();
}

// selectors
const table = document.querySelector("#table_body");
const addBtn = document.querySelector(".add-btn");

// function to format date
const getDate = function (date) {
  const time = new Date(date);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};

// get data from backend and format it
getData().then((data) => {
  const eventsData = data;

  // convert the date string to format date
  eventsData.forEach((item) => {
    const startTime = +item.startDate;
    const start = getDate(startTime);
    item.startDate = start;

    const endTime = +item.endDate;
    const end = getDate(endTime);
    item.endDate = end;
  });

  // console.log(eventsData);

  loopData(eventsData);
});

// Create the table and insert the data
const loopData = (data) => {
  data.forEach((item) => {
    const row = createRow(item);
    table.appendChild(row);
  });
};

// create the table row
const createRow = (item, data) => {
  const tableRow = document.createElement("tr");
  tableRow.id = `row${item.id}`;

  for (let keys of Object.keys(item)) {
    const tableData = document.createElement("td");
    tableData.id = `td_${keys}_${item.id}`;
    if (keys === "id") {
      // key === id, create four buttons
      const editButton = document.createElement("button"); // edit button
      editButton.id = `edit_button_${item.id}`;
      editButton.innerHTML = "Edit";
      tableData.appendChild(editButton);
      editButton.addEventListener("click", editRow); // add eventlistener for edit

      const deleteButton = document.createElement("button"); // delete button
      deleteButton.id = `delete_button_${item.id}`;
      deleteButton.innerHTML = "Delete";
      tableData.appendChild(deleteButton);
      deleteButton.addEventListener("click", deleteRow); // eventlistener for delete

      const saveButton = document.createElement("button"); // save button
      saveButton.id = `save_button_${item.id}`;
      saveButton.innerHTML = "Save";
      tableData.appendChild(saveButton);
      // by default, hide the save and close button
      saveButton.style.display = "none";
      saveButton.addEventListener("click", saveRow); // eventlistener for save button

      const closeButton = document.createElement("button"); // close button
      closeButton.id = `close_button_${item.id}`;
      closeButton.innerHTML = "Close";
      tableData.appendChild(closeButton);
      // by default, hide the save and delete button
      closeButton.style.display = "none";
      closeButton.addEventListener("click", closeRow); // eventlistener for save button
    } else {
      tableData.innerHTML = item[keys];
    }

    // append table data to table row
    tableRow.appendChild(tableData);
  }
  return tableRow;
};

// // load data to show the table
// data.forEach(item => {
//     const row = createRow(item);
//     table.appendChild(row);
// })

// function to edit row
function editRow(row) {
  const targets = row.target.id.split("_");
  // console.log(targets)  // edit button number
  const no = targets[2]; // get the row number, which is same to the item.id
  row.target.style.display = "none";
  document.getElementById("delete_button_" + no).style.display = "none";
  document.getElementById("save_button_" + no).style.display = "inline-block";
  document.getElementById("close_button_" + no).style.display = "inline-block";

  const name = document.getElementById("td_eventName_" + no);
  const start = document.getElementById("td_startDate_" + no);
  const end = document.getElementById("td_endDate_" + no);

  const name_data = name.innerHTML;
  const start_data = start.innerHTML;
  const end_data = end.innerHTML;

  name.innerHTML =
    "<input type='text' id='eventName_text" +
    no +
    "' value='" +
    name_data +
    "'>";
  start.innerHTML =
    "<input type='text' id='startDate_text" +
    no +
    "' value='" +
    start_data +
    "'>";
  end.innerHTML =
    "<input type='text' id='endDate_text" + no + "' value='" + end_data + "'>";
}

// function to save row
function saveRow(row) {
  const targets = row.target.id.split("_");
  const no = targets[2];

  const name_val = document.getElementById("eventName_text" + no).value;
  const start_val = document.getElementById("startDate_text" + no).value;
  const end_val = document.getElementById("endDate_text" + no).value;

  document.getElementById("td_eventName_" + no).innerHTML = name_val;
  document.getElementById("td_startDate_" + no).innerHTML = start_val;
  document.getElementById("td_endDate_" + no).innerHTML = end_val;

  row.target.style.display = "none";
  document.getElementById("close_button_" + no).style.display = "none";
  document.getElementById("edit_button_" + no).style.display = "inline-block";
  document.getElementById("delete_button_" + no).style.display = "inline-block";
}

// function to delete row
function deleteRow(row) {
  const targets = row.target.id.split("_");
  document.getElementById("row" + targets[2]).style.display = "none";
}

// function to close row
function closeRow(row) {
  const targets = row.target.id.split("_");
  const no = targets[2];

  row.target.style.display = "none";
  document.getElementById("save_button_" + no).style.display = "none";
  document.getElementById("edit_button_" + no).style.display = "inline-block";
  document.getElementById("delete_button_" + no).style.display = "inline-block";

  const name_val = document.getElementById("eventName_text" + no).defaultValue;
  document.getElementById("td_eventName_" + no).innerHTML = name_val;
  const start_val = document.getElementById("startDate_text" + no).defaultValue;
  document.getElementById("td_startDate_" + no).innerHTML = start_val;
  const end_val = document.getElementById("endDate_text" + no).defaultValue;
  document.getElementById("td_endDate_" + no).innerHTML = end_val;
}

// add btn event listener
addBtn.addEventListener("click", addRow);

function addRow() {
  const rowCount = table.rows.length;
  const No = rowCount + 1;
  const row = table.insertRow(rowCount);
  row.id = `row${No}`;

  const cell1 = row.insertCell(0);
  cell1.id = `td_eventName_${No}`;
  const td1 = document.createElement("input");
  td1.type = "text";
  td1.id = `eventName_text${No}`;
  cell1.appendChild(td1);

  const cell2 = row.insertCell(1);
  cell2.id = `td_startDate_${No}`;
  const td2 = document.createElement("input");
  td2.type = "date";
  td2.id = `startDate_text${No}`;
  cell2.appendChild(td2);

  const cell3 = row.insertCell(2);
  cell3.id = `td_endDate_${No}`;
  const td3 = document.createElement("input");
  td3.type = "date";
  td3.id = `endDate_text${No}`;
  cell3.appendChild(td3);

  const cell4 = row.insertCell(3);
  const td4 = document.createElement("td");
  td4.id = `td_${""}_${No}`;

  // Create buttons
  const editButton = document.createElement("button"); // edit button
  editButton.id = `edit_button_${No}`;
  editButton.innerHTML = "Edit";
  td4.appendChild(editButton);
  // by default, hide the edit button
  editButton.style.display = "none";
  editButton.addEventListener("click", editRow); // add eventlistener for edit button

  const deleteButton = document.createElement("button"); // delete button
  deleteButton.id = `delete_button_${No}`;
  deleteButton.innerHTML = "Delete";
  td4.appendChild(deleteButton);
  // by default, hide the delete button
  deleteButton.style.display = "none";
  deleteButton.addEventListener("click", deleteRow); // eventlistener for delete button

  const saveButton = document.createElement("button"); // save button
  saveButton.id = `save_button_${No}`;
  console.log(saveButton.id);
  saveButton.innerHTML = "Save";
  td4.appendChild(saveButton);
  saveButton.addEventListener("click", saveRow); // eventlistener for save button

  const closeButton = document.createElement("button"); // close button
  closeButton.id = `close_button_${No}`;
  closeButton.innerHTML = "Close";
  td4.appendChild(closeButton);
  closeButton.addEventListener("click", closeRow); // eventlistener for close button

  cell4.appendChild(td4);
  row.appendChild(cell4);
}
