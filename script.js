document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("textbox1");
    const taskContainers = document.querySelectorAll(".shape"); // Select both forms
    let taskCounts = [5, 10]; // Initialize counts for each form
    let currentFormIndex = 0; // To alternate between forms

    // Load tasks from local storage when the page loads
    loadTasks();

    // Function to transfer text from the input box to the first empty task field
    function transferText(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        // Get all current task input fields (both static and dynamically added)
        const allTaskInputs = Array.from(document.querySelectorAll(".lists input[type='text']"));

        // Find the first empty task input field
        const emptyTaskInput = allTaskInputs.find(input => input.value === "");

        if (emptyTaskInput) {
            emptyTaskInput.value = taskText; // Fill the input with the task
            taskInput.value = ""; // Clear the input
            saveTasks(); // Save the updated task list
        } else {
            alert("All tasks are filled!"); // Alert if no empty inputs are available
        }
    }

    // Function to add more tasks to a specific form, alternating between the two
    function addMoreTasks() {
        const formIndex = currentFormIndex;
        const taskDiv = document.createElement('div');
        taskDiv.className = 'lists';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = handleCheckboxChange; // Attach checkbox change handler

        const textInput = document.createElement('input');
        textInput.type = 'text';
        taskCounts[formIndex]++; // Increment task count for the specific form
        textInput.placeholder = `Task ${taskCounts[formIndex]}`; // Update placeholder for new task

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.type = 'button';
        editButton.onclick = editTask; // Attach edit function

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.type = 'button';
        deleteButton.className = 'delete';
        deleteButton.onclick = deleteTask; // Attach delete function

        // Append elements to the new task div
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(textInput);
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);

        // Append the new task div to the specified form
        taskContainers[formIndex].appendChild(taskDiv);

        // Alternate form index for the next task addition
        currentFormIndex = (currentFormIndex + 1) % taskContainers.length;

        saveTasks();
    }

    // Function to handle checkbox change
    function handleCheckboxChange(event) {
        const textInput = event.target.nextElementSibling; // Get the associated text input
        const dingSound = document.getElementById("dingSound"); // Get the audio element

        if (event.target.checked) {
            textInput.style.backgroundColor = "lightgreen"; // Set to light green when checked
            dingSound.play(); // Play the ding sound
        } else {
            textInput.style.backgroundColor = ""; // Reset background color when unchecked
        }
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const allTaskInputs = Array.from(document.querySelectorAll(".lists input[type='text']"));
        savedTasks.forEach((task, index) => {
            if (index < allTaskInputs.length) {
                allTaskInputs[index].value = task; // Set the value of each task input
            }
        });
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const allTaskInputs = Array.from(document.querySelectorAll(".lists input[type='text']"));
        const tasks = allTaskInputs.map(input => input.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to delete a task
    function deleteTask(event) {
        const taskInput = event.target.parentElement.querySelector('input[type="text"]');
        taskInput.value = ""; // Clear the input field
        saveTasks();
    }

    // Function to edit a task
    function editTask(event) {
        const taskInput = event.target.previousElementSibling;
        if (taskInput.readOnly) {
            taskInput.readOnly = false; // Make input editable
            taskInput.focus(); // Focus on the input field
            event.target.textContent = "Save"; // Change button text to "Save"
        } else {
            taskInput.readOnly = true; // Make input read-only
            event.target.textContent = "Edit"; // Change button text back to "Edit"
            saveTasks(); // Save the updated task list
        }
    }

    // Attach the transferText function to the Add button
    const addButton = document.querySelector("form button[type='submit']");
    addButton.onclick = transferText;

    // Attach the addMoreTasks function to the "More" button to alternate between forms
    const addMoreButton = document.getElementById("moreButton");
    addMoreButton.onclick = addMoreTasks;

    // Add event listeners for existing delete and edit buttons in the initial load
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => {
        button.onclick = deleteTask;
    });

    const editButtons = document.querySelectorAll(".shape button:nth-child(3)");
    editButtons.forEach(button => {
        button.onclick = editTask;
    });

    // Attach handleCheckboxChange to existing checkboxes
    const checkboxes = document.querySelectorAll(".lists input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.onchange = handleCheckboxChange;
    });
});
