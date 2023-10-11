let task = document.querySelector("input");
let add = document.querySelector("label");
let cont = document.querySelector(".tasks");
let counter = 1;

// load all the tasks of the person

document.body.onload = function () {
  let taskList = localStorage.getItem("task")
    ? localStorage.getItem("task").split(",")
    : [];
  taskList.forEach((e) => {
    let tsk = document.createElement("div");
    tsk.style.width = "80%";
    tsk.style.color = "white";
    tsk.innerHTML = `
  <div class="checkbox-wrapper-13 task">
  <input type="checkbox">
  <label id="for-task">${e}</label>
  <button type="button" title="delete">
    <i class="fa-solid fa-trash-can"></i>
  </button>
  </div>
  `;
    if (localStorage.getItem(`${e}`) == 1) {
      tsk.firstElementChild.style.cssText = "text-decoration: line-through";
      tsk.firstElementChild.classList.add("checked");
      tsk.firstElementChild.firstElementChild.checked = true;
    }
    cont.append(tsk);
  });
  checkclick();
};

// to add a line through on completed tasks
// and remove tasks

function checkclick() {
  let check = document.querySelectorAll(`input[type="checkbox"]`);
  let btn = document.querySelectorAll("button");
  check.forEach((e) => {
    console.log(e);
    e.onclick = function () {
      if (!this.parentElement.classList.contains("checked")) {
        this.parentElement.style.cssText = "text-decoration: line-through";
        this.parentElement.classList.add("checked");
        localStorage.setItem(`${this.nextElementSibling.innerHTML}`, "1");
      } else {
        this.parentElement.style.cssText = "text-decoration: none";
        this.parentElement.classList.remove("checked");
        localStorage.setItem(`${this.nextElementSibling.innerHTML}`, "0");
      }
    };
  });
  btn.forEach((e) => {
    e.onclick = function () {
      let tasksRemoved = localStorage
        .getItem("task")
        .split(",")
        .filter((n) => {
          return n !== e.previousElementSibling.innerHTML;
        });
      localStorage.removeItem(`${e.previousElementSibling.innerHTML}`);
      localStorage.setItem("task", tasksRemoved.join(",")); // Convert array to string before storing
      e.parentElement.parentElement.remove();
    };
  });
}

let taskList = [];

// add tasks

add.onclick = function create() {
  if (task.value !== "") {
    let newTask = document.createElement("div");
    newTask.style.width = "80%";
    newTask.innerHTML = `
  <div class="checkbox-wrapper-13 task">
  <input type="checkbox">
  <label id="for-task">${task.value}</label>
  <button type="button" title="delete">
    <i class="fa-solid fa-trash-can"></i>
  </button>
  </div>
  `;
    let tasklst = [];
    let l = localStorage.getItem("task")
      ? localStorage.getItem("task").split(",")
      : [];
    new Set([...l]).forEach((e) => {
      tasklst.push(e);
    });
    taskList = tasklst;
    taskList.push(task.value);
    localStorage.setItem("task", taskList.join(","));
    localStorage.setItem(task.value, "0");
    cont.append(newTask);
    task.value = "";
    checkclick();
  }
};
