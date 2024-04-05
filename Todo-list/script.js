const addBtn = document.querySelector(".add-btn");
const pendingTask = document.querySelector(".Task-Container");
const taskInput = document.querySelector(".Task-input");
const error = document.querySelector(".error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const addTask = () => {
  const taskName = taskInput.value.trim();

  //to display error message
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  //task block

  const task = `<div class="task"> 
  <input type="checkbox" class="task-check">
<span class="taskname">${taskName}</span>

<button class="edit">
<i class="fa-solid fa-pen-to-square"></i>
</button>

<button class="delete">
<i class="far fa-trash-alt"></i>
</button>

</div>`;

  // add the task as last child of taskcontainer (.Task-Container)

  pendingTask.insertAdjacentHTML("beforeend", task);
  taskInput.value = "";
  error.style.display = "none";

  //implement checkbox functionality

  const taskCheck = document.querySelectorAll(".task-check");

  taskCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskCount -= 1;
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });

  //to implement edit button functionality

  const editBtn = document.querySelectorAll(".edit");
  editBtn.forEach((editButton) => {
    editButton.onclick = (e) => {
      let targetElement = e.target;
      if (!(e.target.className == "edit")) {
        targetElement = e.target.parentElement;
      }
      taskInput.value = targetElement.previousElementSibling?.innerText;
      targetElement.parentNode.remove();

      taskCount -= 1;
      displayCount(taskCount);
    };
  });

  //implementing delete buuton functionality

  const deleteBtn = document.querySelectorAll(".delete");

  deleteBtn.forEach((button) => {
    button.onclick = () => {
      // Check if the associated checkbox is checked
      const checkbox = button.parentNode.querySelector(".task-check");
      const isChecked = checkbox.checked;

      // Remove the task
      button.parentNode.remove();

      // Decrement task count only if the checkbox is not checked
      if (!isChecked) {
        taskCount -= 1;
        displayCount(taskCount);
      }
    };
  });

  taskCount++;
  displayCount(taskCount);
};

// Function to handle keydown event on the input box
const handleEnterKeyPress = (event) => {
  // Check if the pressed key is the Enter key (key code 13)
  if (event.keyCode === 13) {
    // Simulate a click event on the Add button
    addBtn.click();
  }
};

// Add event listener for keydown event on the input box
taskInput.addEventListener("keydown", handleEnterKeyPress);

addBtn.addEventListener("click", addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  taskInput.value = "";
};
