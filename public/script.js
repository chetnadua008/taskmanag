async function loadTasks() {
    let res = await fetch("/tasks");
    let tasks = await res.json();

    let html = "";
    tasks.forEach((task, i) => {
        html += `<li>${task}
   <button onclick="deleteTask(${i})">Delete</button>
   </li>`;
    });

    document.getElementById("list").innerHTML = html;
}

async function addTask() {
    let val = document.getElementById("taskInput").value;

    await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: val })
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch("/tasks/" + id, { method: "DELETE" });
    loadTasks();
}

loadTasks();