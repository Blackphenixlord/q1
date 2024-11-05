document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("textbox1");
    const taskContainers = document.querySelectorAll(".shape");
    let taskCounts = [5, 10];
    let currentFormIndex = 0;

    loadTasks();

    function transferText(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const allTaskInputs = Array.from(document.querySelectorAll(".lists input[type='text']"));
        const emptyTaskInput = allTaskInputs.find(input => input.value === "");

        if (emptyTaskInput) {
            emptyTaskInput.value = taskText;
            taskInput.value = "";
            saveTasks();
        } else {
            alert("All tasks are filled!");
        }
    }

    function addMoreTasks() {
        const formIndex = currentFormIndex;
        const taskDiv = document.createElement('div');
        taskDiv.className = 'lists';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = handleCheckboxChange;

        const textInput = document.createElement('input');
        textInput.type = 'text';
        taskCounts[formIndex]++;
        textInput.placeholder = `Task ${taskCounts[formIndex]}`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.type = 'button';
        editButton.onclick = editTask;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.type = 'button';
        deleteButton.className = 'delete';
        deleteButton.onclick = deleteTask;

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(textInput);
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);
        taskContainers[formIndex].appendChild(taskDiv);

        currentFormIndex = (currentFormIndex + 1) % taskContainers.length;

        saveTasks();
    }

    function handleCheckboxChange(event) {
        const textInput = event.target.nextElementSibling;
        const dingSound = document.getElementById("dingSound");

        if (event.target.checked) {
            textInput.style.backgroundColor = "lightgreen";
            dingSound.play();
        } else {
            textInput.style.backgroundColor = "";
        }
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const allTaskInputs = Array.from(document.querySelectorAll(".lists input[type='text']"));
        savedTasks.forEach((task, index) => {
            if (index < allTaskInputs.length) {
                allTaskInputs[index].value = task;
            }
        });
    }

    function saveTasks() {
        const allTaskInputs = Array.from(document.querySelectorAll(".lists input[type='text']"));
        const tasks = allTaskInputs.map(input => input.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function deleteTask(event) {
        const taskInput = event.target.parentElement.querySelector('input[type="text"]');
        taskInput.value = "";
        saveTasks();
    }

    function editTask(event) {
        const taskInput = event.target.previousElementSibling;
        if (taskInput.readOnly) {
            taskInput.readOnly = false;
            taskInput.focus();
            event.target.textContent = "Save";
        } else {
            taskInput.readOnly = true;
            event.target.textContent = "Edit";
            saveTasks();
        }
    }

    const addButton = document.querySelector("form button[type='submit']");
    addButton.onclick = transferText;

    const addMoreButton = document.getElementById("moreButton");
    addMoreButton.onclick = addMoreTasks;

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => {
        button.onclick = deleteTask;
    });

    const editButtons = document.querySelectorAll(".shape button:nth-child(3)");
    editButtons.forEach(button => {
        button.onclick = editTask;
    });

    const checkboxes = document.querySelectorAll(".lists input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.onchange = handleCheckboxChange;
    });
});
