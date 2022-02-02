const btn = document.getElementById("btn");
const content = document.getElementById("content");

const URL = "http://localhost:3000/events";
const taskList = [];
let showNewRow = false;

const convertDate = (time) => {
  if (time !== "") {
    let date = new Date(time);
    (month = ("0" + (date.getMonth() + 1)).slice(-2)),
      (day = ("0" + date.getDate()).slice(-2));
    return [date.getFullYear(), month, day].join("-");
  } else {
    return "";
  }
};

//Finish Show Feature
const renderEvents = (arr) => {
  let template = "";
  console.log(taskList);
  arr.forEach((event) => {
    if (event.isDisabled) {
      template += `
            <tr>
              <span>
                <td><input type="text" id="event-name-input-${
                  event.id
                }" value="${convertDate(+event.startDate)}" disabled></td>
                <td><input type="date" id="start-date-input-${
                  event.id
                } " value="${convertDate(+event.startDate)}" disabled></td>
                <td><input type="date" id="end-date-input-${
                  event.id
                }" value="${convertDate(+event.startDate)}" disabled></td>
                <td><button onclick="editBtn(${event.id})">EDIT</button>
                <button onclick="deleteBtn(${event.id})">DELETE</button></td>
              </span>
            </tr>
          `;
    } else {
      template += `
            <tr>
              <span>
                <td><input type="text" id="event-name-input-${event.id}" value="${event.eventName}"></td>
                <td><input type="date" id="start-date-input-${event.id} "value="${event.startDate}"></td>
                <td><input type="date" id="end-date-input-${event.id}" value="${event.endDate}"></td>
                <td><button onclick="saveEditBtn(${event.id})">SAVE</button>
                <button onclick="cancelBtn()">CANCEL</button></td>
              </span>
            </tr>
          `;
    }
  });

  if (showNewRow) {
    template += `
        <tr>
          <span>
            <td><input id="event-name-input" type="text"></td>
            <td><input id="start-date-input" type="date"></td>
            <td><input id="end-date-input" type="date"></td>
            <td><button onclick="saveEdit()">SAVE</button>
            <button onclick="cancelBtn()">CANCEL</button></td>
          </span>
        </tr>
    `;
  }

  content.innerHTML = template;
};

//Finish Initial Render Feature
const initialRender = async () => {
  const res = await fetch(URL);
  const posts = await res.json();

  posts.forEach((event) => {
    event.isDisabled = true;
    taskList.push(event);
  });

  renderEvents(taskList);
};

//Working on Add Feature
btn.addEventListener("click", (e) => {
  showNewRow = true;
  renderEvents(taskList);
});

//Finish Cancel Feature
function cancelBtn() {
  renderEvents(taskList);
}

//WOrking on Edit Feature
function editBtn(id) {
  for (let each of taskList) {
    if (taskList[each] === id) {
      taskList[each].isDisabled = false;
    }
  }
  renderEvents(taskList);
}

//Finish Save Feature
function saveEdit() {
  let eventName = document.getElementById("event-name-input").value;
  let startDate = document.getElementById("start-date-input").value;
  let endDate = document.getElementById("end-date-input").value;

  fetch(URL + taskList.id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      eventName: eventName,
      startDate: startDate,
      endDate: endDate,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  initialRender();
}

//Finish Save After Edit Feature
function saveEditBtn(id) {
  let eventName = document.getElementById("event-name-input-" + id).value;
  let startDate = document.getElementById("start-date-input-" + id).value;
  let endDate = document.getElementById("end-date-input-" + id).value;

  fetch(URL + "/" + taskList[id].id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      eventName: eventName,
      startDate: startDate,
      endDate: endDate,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  initialRender();
}

//Finish Delete Feature
function deleteBtn(id) {
  fetch(URL + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  initialRender();
}

window.addEventListener("DOMContentLoaded", () => initialRender());
