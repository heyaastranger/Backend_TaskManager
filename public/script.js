async function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskList = document.getElementById("tasks"); // Corrected to "tasks"

    // Create task element
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `<span>${taskText}</span><button onclick="completeTask(this)">Complete</button>`;
    try {
      const res = await fetch(
        "https://chartreuse-green-octopus-garb.cyclic.app/task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: taskText }),
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }

    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //     // You can add further actions upon successful submission
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     // Handle error scenarios
    //   });

    // Append task to the list
    taskList.appendChild(taskElement);

    // Clear input field
    taskInput.value = "";
  }
  //   console.log("Clicked");
}

function completeTask(button) {
  const taskElement = button.parentElement;
  taskElement.style.textDecoration = "line-through";
  button.disabled = true;
}

// document.addEventListener("DOMContentLoaded", function () {
//   const NewTask = document.getElementById("task");

//   NewTask.addEventListener("submit", function (event) {
//     event.preventDefault(); //Prevent the defualt form from submission

//     const TaskData = {
//       task: NewTask.elements.taskInput.value,
//     };

//     fetch("http://localhost:3000", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(TaskData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//         // You can add further actions upon successful submission
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         // Handle error scenarios
//       });
//   });
// });
