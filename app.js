let tdl = document.querySelector("#tdl")
let input = document.querySelector("#tdl_control > input");
let tasks;
if(localStorage.getItem("tasks") == null){
    localStorage.setItem("tasks", "[]")
    tasks = JSON.parse(localStorage.getItem("tasks"))
}
else{
    tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.forEach(element => {
        if(element == null) return
        tdl.innerHTML = `<div class="tdl ${element[1]}">
        <h2>${element[0]}</h2>
        <button class="done" onclick="done(event)" >Done</button>
        <button class="delete" onclick="deleteTask(event)">Delete</button>
    </div>` + tdl.innerHTML;
    });
}

function addtask() {
    if(input.value != ""){
        tdl.innerHTML = `<div class="tdl">
        <h2>${input.value}</h2>
        <button class="done" onclick="done(event)" >Done</button>
        <button class="delete" onclick="deleteTask(event)">Delete</button>
    </div>` + tdl.innerHTML;
    tasks.push([`${input.value}`," "])
    localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    else{
        alert("Please Type")
    }
}

function findTask(str){
    let num;
    tasks.forEach((element, index) => {
        if(element == null) return
        if(element[0] == str){
            num = index
            return
        }
        else{
            num = ""
        }
    });
    return num;
}

function filterTask(){
    let newtask = []
    tasks.forEach((element) => {
        if(element != null){
            newtask.push(element)
        }
    })
    tasks = newtask;
}

function done(event){
    let elem = event.target
    let parent = elem.parentElement;
    let text = parent.querySelector("h2").innerText
    parent.classList.add("task_done")
    tasks[findTask(text)][1] = "task_done"
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function deleteTask(event) {
    let elem = event.target
    let parent = elem.parentElement;
    let text = parent.querySelector("h2").innerText
    parent.remove()
    delete tasks[findTask(text)]
    filterTask()
    localStorage.setItem("tasks", JSON.stringify(tasks))
}