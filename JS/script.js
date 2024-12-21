let form = document.getElementById('form');
let tablecontainer = document.getElementById('tablecontainer');
let tasktable = document.getElementById('tasktable');
function generateUniqueId() {
    return uuid.v4(); // generating uinque id
}
function formatTimestamp(inputDate) {// Formate the Date Object value to something attractive
    // Convert input to a Date object (if it's not already)
    const date = new Date(inputDate);
    // Check if the date is valid
    if (isNaN(date)) {
        return "Invalid Date"; // Return error if the input is not a valid date
    }
    // Formatting options
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };
    // Format the date
    return date.toLocaleString("en-US", options);
} 
function getTableRecordHTML(uuid, name, createdAt,complete,index) { //this function return dynamic interpoleted record with js variables

    return `<tr id="${uuid}" class="${complete?'complete':'pending'}">
                    <td class="${complete?'strikethrough':''}">${name}</td>
                    ${complete?'<td></td>':`<td><button class="btn completebtn" onclick="markTaskComplete('${uuid}','${name}')"><i class="fa fa-check"></button></td>`}
                    ${complete?'<td></td>':`<td><input type="text" class="taskinput taskeditinput" placeholder="Enter Edited Task" id="${uuid+index.toString()}" name="taskeditinput" required><button class="btn editbtn" onclick="editTask('${uuid}','${name}','${index}')"><i class="fa fa-pen"></button></td>`}
                    <td><button class="btn deletebtn" onclick="deleteTask('${uuid}','${name}')"><i class="fa fa-trash"></button></td>
                    <td class="${complete?'strikethrough':''}">${formatTimestamp(createdAt)}</td>
                </tr>`
}
function loadTasks() { //this function loads tasks to the DOM table
    let tasks = JSON.parse(localStorage.getItem("tasks")); //fetching tasks stored in local storage and parsing the string value to Javascript Object
    if (tasks !== null && Object.entries(tasks).length!==0) {
        tablecontainer.style.display = "block";
        tasktable.innerHTML = `<tr>
                    <th>Task</th>
                    <th width="50px">MARKCOMPLETE</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                    <th>CREATEDON</th>
                </tr>`;
        Object.entries(tasks).forEach(([uuid, task],index) => { //convert task to array of pair [key,value]
            let record = getTableRecordHTML(uuid, task.taskvalue, task.createdAt,task.complete,index);
            tasktable.insertAdjacentHTML("beforeend", record);
        });
    } else {
        tablecontainer.style.display = "none";
    }
}
function loadCompletedTasks() { //this function filters Completed tasks using jQuery Filter to the DOM table
    $('#tasktable tr').filter('.pending').hide();
    $('#tasktable tr').filter('.complete').show();
}
function loadPendingTasks() { //this function filters pending tasks using jQuery Filter to the DOM table
    $('#tasktable tr').filter('.pending').show();
    $('#tasktable tr').filter('.complete').hide();
}
function markTaskComplete(id,name){ //this function is invoked when markcomplete button is clicked and the parameters are passed to function when loading tasks to table
    if (confirm(`Are you sure you completed task ${name}`)) { // Make sure if user what to mark that task complete
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[id].complete=true;
        localStorage.setItem("tasks",JSON.stringify(tasks))
        loadTasks();
    }
}
function deleteTask(id,name){//this function is invoked when delete button is clicked and the parameters are passed to function when loading tasks to table
    if (confirm(`Are you sure you want to remove task ${name}`)) {// confirms that if user is sure to delete the record
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        delete tasks[id];
        localStorage.setItem("tasks",JSON.stringify(tasks))
        $('#'+id).fadeOut(400,()=>{
            loadTasks();
        });
    }
}
function editTask(id,name,index){//this function is incvoked when edit button is clicked and the parameters are passed to function when loading tasks to table
    let inputid='#'+id.toString()+index.toString();
    let updatedtask=$(inputid).val();
    if(updatedtask!==""){
        if (confirm(`Are you sure you want to edit task From '${name}' To '${updatedtask}'`)) {//// confirms that if user is sure to update the record
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks[id].taskvalue=updatedtask;
            localStorage.setItem("tasks",JSON.stringify(tasks))
            loadTasks();
        }
    }else{
        alert("Please enter new value for task "+name)
    }
}
function toggleDropdown(){//toggle dropdown items
    $('#dropdownbody').slideToggle(400);
}

form.addEventListener('submit', (e) => { //when the form is submited this callback is invoked
    e.preventDefault(); // prevent submit action form reloading the page
    let taskvalue = e.target.taskinput.value; //fetch the input task value from event object
    if (taskvalue !== "") {
        let tasks = JSON.parse(localStorage.getItem("tasks")) //fetching tasks stored in local storage and parsing the string value to Javascript Object
        let uuid = generateUniqueId(); // Generating Unique ID for each record
        if (tasks !== null) { //if there are tasks already present in object then append new child object to the tasks
            tasks[uuid] = {
                taskvalue: taskvalue,
                createdAt: new Date(),
                complete: false
            }
        } else { //if there are no tasks already present in object then create new parent task object then append new child object to the tasks
            tasks = new Object();
            tasks[uuid] = {
                taskvalue: taskvalue,
                createdAt: new Date(),
                complete: false
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks)); // store the new/updated task object to localstorage after converting JS object to string
        loadTasks();
        if(alert("Task Added Succcessfully!!")===undefined){
            $('#'+uuid).fadeOut(0).fadeIn(400);
        }
    } else {
        alert("Please Input Task!!")
    }
    e.target.taskinput.value = ""; // Empty the task input value 
})
loadTasks(); //when page is loaded LoadTasks function is Invoked