const state = {
  taskList: [],
};

const cardSpace = document.querySelector(".cardSpace");
const cardBig = document.querySelector(".cardBig");

// add to Storage
const updateStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(state.taskList));
};

// add new task
const addItem = (event) => {
  // event.preventDefault();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let d = new Date();
  let mm = month[d.getMonth()];
  let dd = d.getDate();
  const Item = {
    id: Date.now(),
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    img: document.getElementById("imageUrl").value,
    type: document.getElementById("taskType").value,
    date: `${mm} ${dd}`,
  };

  // state updation
  state.taskList.push(Item);

  // localStorage updation
  updateStorage();

  alert("Item added successfully");
};

// console.log(cardSpace);
// cardSpace.insertAdjacentHTML("beforeend", "<h1>hi</h1>");

const cardLayout = (card) => {
  var temp = `'${card.title}','${card.img}','${card.description}','${card.date}'`;

  return `<div key=${card.id} id=${
    card.id
  } class="card p-2 col-md-6 col-lg-4" style="width: 18rem">
  <div class="d-flex gap-2 justify-content-end mb-2">
    <button onclick="editItem(event)" class="btn btn-outline-info">
      <i class="fa fa-pencil-alt"></i>
    </button>
    <button onclick="deleteItem('${card.id}')" class="btn btn-outline-danger">
      <i class="fa fa-trash-alt"></i>
    </button>
  </div>
  <img
    src="${card.img}"
    class="card-img-top ${card.img == "" ? `d-none` : console.log("img found")}"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">${card.title}</h5>
    <p class="card-text">${card.description}</p>
    <a href="#" class="btn btn-success btn-sm rounded-pill">${card.type}</a>
  </div>
  <button onclick="showBig(${temp})" class="btn btn-outline-primary" data-bs-toggle="modal"
  data-bs-target="#exampleModal1">Open Task</button>
</div>`;
};

const displayCards = () => {
  var cards = JSON.parse(localStorage.getItem("tasks"));
  if (cards.length == 0) return;
  state.taskList = cards;

  cards.map((card) => {
    cardSpace.insertAdjacentHTML("beforeend", cardLayout(card));
  });
};

displayCards();

const showBig = (title, img, description, date) => {
  console.log("big");

  const tem = `<div class="modal-content">
  <div class="modal-header">
    <h4 class="modal-title" id="exampleModalLabel">${title}</h4>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>
  </div>
  <div class="modal-body">
    <img src="${img}" alt="..." class="img-fluid"  />
    <i>Created on ${date}</i>
    <h6 class="text-muted">${description}</h6>
  </div>
</div>`;

  cardBig.innerHTML = tem;
};

const editItem = (event) => {
  console.log("edit");
  let tg = event.target;
  let parent;

  if (tg.tagName == "BUTTON") parent = tg.parentNode.parentNode;
  else parent = tg.parentNode.parentNode.parentNode;

  // console.log(parent);

  let title = parent.childNodes[5].childNodes[1];
  let description = parent.childNodes[5].childNodes[3];
  let type = parent.childNodes[5].childNodes[5];
  // console.log(title, description, type);
  title.setAttribute("contenteditable", "true");
  description.setAttribute("contenteditable", "true");
  type.setAttribute("contenteditable", "true");

  let submit = parent.childNodes[7];
  submit.removeAttribute("data-bs-toggle");
  submit.removeAttribute("data-bs-target");
  submit.innerHTML = "Save Changes";
  submit.setAttribute("onclick", "saveEdits(event)");
};

const saveEdits = (event) => {
  let tg = event.target;
  let parent = tg.parentNode;
  let id = parent.id;
  console.log(parent.id);

  let title = parent.childNodes[5].childNodes[1];
  let description = parent.childNodes[5].childNodes[3];
  let type = parent.childNodes[5].childNodes[5];
  let submit = parent.childNodes[7];

  const eItem = {
    id: id,
    title: title.innerHTML,
    description: description.innerHTML,
    type: type.innerHTML,
  };

  submit.innerHTML = "Open Task";
  let cp = state.taskList;
  cp = cp.map((item) =>
    item.id == eItem.id
      ? {
          id: eItem.id,
          title: eItem.title,
          description: eItem.description,
          type: eItem.type,
          img: item.img,
          date: item.date,
        }
      : item
  );
  state.taskList = cp;
  updateStorage();

  title.setAttribute("contenteditable", "false");
  description.setAttribute("contenteditable", "false");
  type.setAttribute("contenteditable", "false");

  submit.setAttribute("data-bs-toggle", "modal");
  submit.setAttribute("data-bs-target", "#exampleModal1");
  var tmp = state.taskList.find((item) => item.id == id);
  var temp = `'${tmp.title}','${tmp.img}','${tmp.description}','${tmp.date}'`;
  submit.setAttribute("onclick", `showBig(${temp})`);
};

const deleteItem = (id) => {
  console.log("deleted");
  const rmv = state.taskList.filter((item) => item.id != id);
  state.taskList = rmv;
  console.log(state.taskList);
  updateStorage();
  alert("task deleted");
  window.location.reload();
};
