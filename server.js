const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

function readTasks() {
    return JSON.parse(fs.readFileSync("tasks.json"));
}

function saveTasks(tasks) {
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
}

app.get("/tasks", (req, res) => {
    res.json(readTasks());
});

app.post("/tasks", (req, res) => {
    let tasks = readTasks();
    tasks.push(req.body.task);
    saveTasks(tasks);
    res.json({ message: "added" });
});

app.delete("/tasks/:id", (req, res) => {
    let tasks = readTasks();
    tasks.splice(req.params.id, 1);
    saveTasks(tasks);
    res.json({ message: "deleted" });
});

app.listen(PORT, () => console.log("running"));