const input = document.getElementById("nameInput");
const btn = document.getElementById("btn");
const list = document.getElementById("list");

let names = JSON.parse(localStorage.getItem("names")) || [];

// αρχικό φόρτωμα
names.forEach(renderItem);

// προσθήκη με κουμπί
btn.addEventListener("click", addName);

// προσθήκη με Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addName();
  }
});


function addName() {
  const value = input.value.trim();
  if (value === "") return;

  names.push(value);
  save();
  renderItem(value);

  input.value = "";
}

function renderItem(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => editItem(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => deleteItem(li, text);

  li.append(span, editBtn, deleteBtn);
  list.appendChild(li);
}

function editItem(span) {
  const νέο = prompt("Νέο όνομα:", span.textContent);
  if (!νέο) return;

  const index = names.indexOf(span.textContent);
  names[index] = νέο;

  span.textContent = νέο;
  save();
}

function deleteItem(li, text) {
  list.removeChild(li);
  names = names.filter(n => n !== text);
  save();
}

function save() {
  localStorage.setItem("names", JSON.stringify(names));
}
