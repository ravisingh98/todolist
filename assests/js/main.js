window.addEventListener("load", init);

function init() {
  if (JSON.parse(localStorage.getItem("allTaskDataObj")) > 0) {
    displayTask();
    setAlarm()
  }
  document.querySelector(".add").addEventListener("click", addTask);
  allData = JSON.parse(localStorage.getItem("allTaskDataObj"));
  document.querySelectorAll(".workdone").forEach(element => {
    element.addEventListener("click", function () {
      element.style.color = "green";
    })
  });
}

function addTask() {
  const taskName = document.querySelector(".taskNameInput").value;
  const taskDes = document.querySelector(".taskDescInput").value;
  const datetime = document.querySelector(".date-time").value;
  const getTaskobj = new getTask(taskName, taskDes, datetime);
  allData.push(getTaskobj);
  localStorage.setItem("allTaskDataObj", JSON.stringify(allData));
  clearData();
  displayTask();
}

function clearData() {
  document.querySelector(".taskNameInput").value = "";
  document.querySelector(".taskDescInput").value = "";
  document.querySelector(".date-time").value = "";
}
function displayTask() {
  let html = "";
  let allTaskDataObj = JSON.parse(localStorage.getItem("allTaskDataObj"));
  allTaskDataObj.forEach((task, index) => {
    if (allTaskDataObj[index].done == true) {
      html += ` <div class="content-data">
      <div class="row">
        <div class="col-1">
          <h3 class="taskName">${task.taskName}</h3>
          <p class="taskDesc">${task.taskDesc}</p>
        </div>
        <div class="col-2"><h3>Time</h3><span>${task.taskDate}</span></div>
        <div class="col-3"><i class="fas fa-trash-alt delete" onclick="deleteTask(${index})"></i><i class="fas fa-check-circle workdone" onclick="workDone(${index})" id="doneColor"></i></div>
      </div>
    </div>`;
      document.querySelector(".content-container").innerHTML = html;
    } else {
      html += ` <div class="content-data">
      <div class="row">
        <div class="col-1">
          <h3 class="taskName">${task.taskName}</h3>
          <p class="taskDesc">${task.taskDesc}</p>
        </div>
        <div class="col-2"><h3>Time</h3><span>${task.taskDate}</span></div>
        <div class="col-3"><i class="fas fa-trash-alt delete" onclick="deleteTask(${index})"></i><i class="fas fa-check-circle workdone" onclick="workDone(${index})" id=""></i></div>
      </div>
    </div>`;
      document.querySelector(".content-container").innerHTML = html;
    }
  });
}
function workDone(index) {
  let allTaskDataObj = JSON.parse(localStorage.getItem("allTaskDataObj"));
  if (allTaskDataObj[index].done == false) {
    allTaskDataObj[index].done = true;
    localStorage.setItem("allTaskDataObj", JSON.stringify(allTaskDataObj));
    displayTask();
  } else {
    allTaskDataObj[index].done = false;
    localStorage.setItem("allTaskDataObj", JSON.stringify(allTaskDataObj));
    displayTask();
  }
}

function deleteTask(index) {
  let task = JSON.parse(localStorage.getItem("allTaskDataObj"));
  task.splice(index, 1);
  localStorage.setItem("allTaskDataObj", JSON.stringify(task));
  if (task.length > 0)
    displayTask();
  else {
    document.querySelector(".content-container").innerHTML = "";
    let h5 = document.createElement("h5");
    h5.className = "ntd";
    h5.innerHTML = "Nothing To Show ...";
    document.querySelector(".content-container").appendChild(h5);
  }
}
function setAlarm() {
  let index = 0;
  var today = new Date();
  var y = today.getFullYear();
  var mnth = today.getMonth() + 1;
  var d = today.getDate();
  var h = today.getHours();
  var m = today.getMinutes();
  m = checkTime(m);
  function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
  }
  let currentDateTime = y + "-" + "0" + mnth + "-" + d + "T" + h + ":" + m;
  let allTaskDataObj = JSON.parse(localStorage.getItem("allTaskDataObj"));
  let setTimeDate = allTaskDataObj[index].taskDate;
  var smallDateTime = 0;
  for (let i = 0; i < allTaskDataObj.length; i++) {
    for (let j = i + 1; j < allTaskDataObj.length; j++) {
      if (allTaskDataObj[i].taskDate < allTaskDataObj[j].taskDate)
        smallDateTime = allTaskDataObj[i].taskDate;
      else
        smallDateTime = allTaskDataObj[j].taskDate;
    }
  }
  console.log(smallDateTime)
  if (currentDateTime == smallDateTime) {
    document.querySelector(".audio").play();
  }
  //setTimeout(setAlarm, 1000);
}