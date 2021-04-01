showtask();
let addTaskInput = document.getElementById("addTaskInput");
let addTaskInputPriority = document.getElementById("addTaskInputPriority");
let addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", function(){
    addTaskInputVal = addTaskInput.value;
    addTaskInputPriorityVal = addTaskInputPriority.value;
    if(addTaskInputVal.trim()!=0){
        let tasks = localStorage.getItem("alltasks");
        if(tasks == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(tasks);
        }
        taskObj.push({'taskLabel': addTaskInputVal, 'taskPriority': addTaskInputPriorityVal,'selected':false, 'editMode': false});
		// console.log(taskObj, 'Anoop');
        localStorage.setItem("alltasks", JSON.stringify(taskObj));
        addTaskInput.value = '';
        addTaskInputPriority.value = '';
    }
    showtask();
})

// showtask
function showtask(){
    let tasks = localStorage.getItem("alltasks");
    if(tasks == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(tasks);
    }
    let html = '';
    let addedTaskList = document.getElementById("addedTaskList");
    taskObj.forEach((item, index) => {
        task = `<div>${item.taskLabel}  ${item.taskPriority}</div>`;
        
        if(item.editMode){
            html += `<div class="listitem row ${item.selected ? "selected" : ""}" >
                    <div class="index col-1" scope="row">${index+1}</div>
                    <input class="editFields col-4" type="text" id="updateTaskInput" value="${item.taskLabel}" />
                    <input class="editFields col-3" type="number" id="updateTaskInputPriority" value="${item.taskPriority}" /> 
                    <div class="col-2"><button type="button" class="btn btn-success mr-sm-2" onclick="saveUpdates(${index})">Save Task</button></div>
                    <div class="col-2"><button type="button" onclick="closeEdit(event,${index})" class="btn btn-default">Close</button></div>
                </div>`;
        }
        else{
            html += `<div class="listitem row ${item.selected ? "selected" : ""}" onclick="toggleSelection(${index})" ondblclick="editTask(event, ${index})" >
                    <div class="index col-1" scope="row">${index+1}</div>
                    <div class="col-4">${item.taskLabel}</div>
                    <div class="col-3">${item.taskPriority}</div>
                    <div class="col-2"><button type="button" onclick="editTask(event, ${index})" class="btn btn-primary">Edit</button></div>
                    <div class="col-2"><button type="button" onclick="deleteitem(${index})" class="btn btn-danger">Delete</button></div>
                </div>`;
        }    
    });
    addedTaskList.innerHTML = html;
    let deleteallbtn = document.getElementById("deleteallbtn");
    let selecteddTasks = taskObj.filter(task => {return task.selected==true;});
    if(selecteddTasks.length == 0){
        deleteallbtn.disabled=true;
    }
    else{
        deleteallbtn.disabled=false;
    }
}

//toggle Checkbox
function toggleSelection(index){
    let tasks = localStorage.getItem("alltasks");
    let taskObj = JSON.parse(tasks);
    if(index < taskObj.length){
        taskObj[index].selected = !taskObj[index].selected;
    }
    localStorage.setItem("alltasks", JSON.stringify(taskObj));
    showtask();
}
// edittask
function editTask(event, index){
    event.stopImmediatePropagation();
    let tasks = localStorage.getItem("alltasks");
    let taskObj = JSON.parse(tasks);
    taskObj.forEach((task,key) => {
        if(key !=index){
            task.editMode = false;
        }
    });
    taskObj[index].editMode=true;
    localStorage.setItem("alltasks", JSON.stringify(taskObj));
    showtask();
}

//close edit mode
function closeEdit(event, index){
    event.stopImmediatePropagation();
    let tasks = localStorage.getItem("alltasks");
    let taskObj = JSON.parse(tasks);
    taskObj[index].editMode=false;
    localStorage.setItem("alltasks", JSON.stringify(taskObj));
    showtask();
}

function saveUpdates(index) {
    let tasks = localStorage.getItem("alltasks");
    let taskObj = JSON.parse(tasks);
    taskObj[index].taskLabel= document.getElementById("updateTaskInput").value;
    taskObj[index].taskPriority= document.getElementById("updateTaskInputPriority").value;
    taskObj[index].selected=false;
    taskObj[index].editMode=false;
    localStorage.setItem("alltasks", JSON.stringify(taskObj));
    showtask();
}

// deleteitem
function deleteitem(index){
    let tasks = localStorage.getItem("alltasks");
    let taskObj = JSON.parse(tasks);
    taskObj.splice(index, 1);
    localStorage.setItem("alltasks", JSON.stringify(taskObj));
    showtask();
}

// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let addTaskBtn = document.getElementById("addTaskBtn");
    let tasks = localStorage.getItem("alltasks");
    let taskObj = JSON.parse(tasks);
    if(tasks == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(tasks);
        taskObj = taskObj.filter((task) => { return !task.selected;})
    }
    addTaskBtn.style.display="block";
    localStorage.setItem("alltasks", JSON.stringify(taskObj));
    showtask();

})

function checkKey(e) {
    e = e || window.event;
    //alert(e.keyCode);
    switch (e.keyCode) {
        case 38:
        topArrowPressed();
        break;

        case 40:
        downArrowPressed();
        break;

        case 8:
        deleteBtnPressed();
        break;

    }
}

document.onkeydown = checkKey;

function topArrowPressed(){
    let tasks = localStorage.getItem("alltasks");
    let taskObj = JSON.parse(tasks);
    let temp = [];
    taskObj.forEach((item,key)=> {
        if(item.selected == true){
            temp.push(key)
        }
    })
    let targetIndexBase = temp.sort()[0];
    let targetIndex = targetIndexBase == 0 ? 0 : targetIndexBase-1;
    taskObj[targetIndex].selected = true;
    taskObj.forEach((item, index) => {
        if(targetIndex !== index){
            item.selected = false;
        }
    })
    localStorage.setItem("alltasks", JSON.stringify(taskObj));
    showtask();
}

function downArrowPressed(){
    let tasks = localStorage.getItem("alltasks");
    let taskObj = JSON.parse(tasks);
    let temp = [];
    taskObj.forEach((item,key) => {
        if(item.selected == true){
            temp.push(key)
        }
    })
    let targetIndexBase = temp.sort()[0];
    let targetIndex = (targetIndexBase == taskObj.length-1) ? taskObj.length-1 : targetIndexBase+1;
    taskObj[targetIndex].selected = true;
    taskObj.forEach((item, index) => {
        if(targetIndex !== index){
            item.selected = false;
        }
    })
    localStorage.setItem("alltasks", JSON.stringify(taskObj));
    showtask();
}

function deleteBtnPressed(){
    let tasks = localStorage.getItem("alltasks");
    let taskObj = JSON.parse(tasks);
    let temp = [];
    taskObj.forEach((item,key) => {
        if(item.selected == true){
            temp.push(key)
        }
    })
    temp.forEach((i) => {
        taskObj.splice(i,1);
    })
    localStorage.setItem("alltasks", JSON.stringify(taskObj));
    showtask();
}














