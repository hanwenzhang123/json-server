const btn = document.getElementById("btn");
const content = document.getElementById("content");

const URL = "http://localhost:3000/events";

btn.addEventListener("click", (e) => {
  let template = `
    <tr>
      <span>
        <td><input type="text"></td>
        <td><input type="date"></td>
        <td><input type="date"></td>
        <td><button class="edit">EDIT</button>
        <button class="delete">DELETE</button></td>
      </span>
    </tr>
    `;
  content.appendChild(template);
});

const cancelBtn = () => {
  renderEvents();
};

const editBtn = (id) => {
  console.log(id);
};

const saveEditBtn = (id) => {
  let eventName = document.getElementById("event-name-input-" + id).value;
  let startDate = document.getElementById("start-date-input-" + id).value;
  let endDate = document.getElementById("end-date-input-" + id).value;

  fetch(URL + eventsLists[id].id, {
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
};

const deleteBtn = (id) => {
  fetch(URL + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      getData();
    });
};

const renderEvents = async () => {
  const res = await fetch(URL);
  const posts = await res.json();

  let template = "";
  posts.forEach((event) => {
    template += `
    <tr>
      <span>
        <td><input type="text" id="event-name-input-${event.id}" value="${event.eventName}"></td>
        <td><input type="date" id="start-date-input-${event.id} "value="${event.startDate}"></td>
        <td><input type="date" id="end-date-input-${event.id}" value="${event.endDate}"></td>
        <td><button onclick="editBtn(${event.id})">EDIT</button>
        <button onclick="deleteBtn(${event.id})">DELETE</button></td>
      </span>
    </tr>
    `;
  });

  content.innerHTML = template;
};

window.addEventListener("DOMContentLoaded", () => renderEvents());

// // Create a new Event
// fetch("http://localhost:3000/events", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   body: JSON.stringify({
//     eventName: "TEST",
//     startDate: "1641790800000",
//     endDate: "1641790800000",
//   }),
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
