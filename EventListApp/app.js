const btn = document.getElementById("btn");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");
const content = document.getElementById("content");

btn.addEventListener("click", (e) => {
  console.log(e);
  const row = document.createElement("tr");
  const span1 = document.createElement("span");
  const data1 = (span1.innerHTML = `
    <td><input type="text"></td>
    <td><input type="date"></td>
    <td><input type="date"></td>`);

  const span2 = document.createElement("span");
  const data2 = (span2.innerHTML = `
    <td><button id="edit">EDIT</button></td>
    <td><button id="delete">DELETE</button></td>`);

  content.appendChild(row);
  row.appendChild(span1);
  span1.appendChild(data1);
  row.appendChild(span2);
  span2.appendChild(data2);
});

editBtn.addEventListener("click", (e) => {
  console.log(e);
});

deleteBtn.addEventListener("click", (e) => {
  console.log(e);
});
