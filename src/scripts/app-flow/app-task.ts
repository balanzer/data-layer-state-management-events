import { Logger } from "../logger/log";
import { addTask, completedTask, removeTask } from "../store/slice/tasks";
import store from "../store/store";

//global to handle logs within click events
const logger = new Logger("app-tasks");

export class AppTasks {
  constructor() {
    logger.info("init todo-app");
    this.addListners();
  }

  addListners() {}
  addDummyTasks() {
    //run once when init app
    store.dispatch(
      addTask({
        taskName: "Household chores,",
        taskDesc: "Complete household chores",
      })
    );
    store.dispatch(
      addTask({ taskName: "Pay bills", taskDesc: "Pay all outstanding bills" })
    );
  }
  addTask(taskName: string, taskDesc: string) {
    //logger.info("add new task ", taskName, ", ", taskDesc);
    store.dispatch(addTask({ taskName: taskName, taskDesc: taskDesc }));
  }

  removeTask(taskID: number) {
    // logger.info("remove task with id ", taskID);
    store.dispatch(removeTask({ id: taskID }));
  }

  markComplete(taskID: number) {
    //logger.info("mark task with id ", taskID, " as complete");
    store.dispatch(completedTask({ id: taskID }));
  }

  handleAddTasks() {
    //hide task added info message
    //process new task
    (document.getElementById("tasks-added-info") as any).style.display = "none";

    const inputTaskNameValue: string = (
      document.getElementById("taskNameInput") as any
    ).value;
    const inputTaskDescValue: string = (
      document.getElementById("taskDescInput") as any
    ).value;

    if (
      !inputTaskNameValue ||
      inputTaskNameValue.trim().length < 8 ||
      inputTaskNameValue.trim().length > 30
    ) {
      (document.getElementById("tasks-validation-errors") as any).innerText =
        "Invalid task name. Task name Must be 8-30 characters long.";
      (
        document.getElementById("tasks-validation-errors") as any
      ).style.display = "block";
      return;
    }

    if (
      !inputTaskDescValue ||
      inputTaskDescValue.trim().length < 10 ||
      inputTaskDescValue.trim().length > 300
    ) {
      (document.getElementById("tasks-validation-errors") as any).innerText =
        "Invalid task desc. Task desc Must be 10-300 characters long.";
      (
        document.getElementById("tasks-validation-errors") as any
      ).style.display = "block";
      return;
    }

    //add new tasks
    //hide any errors
    (document.getElementById("tasks-validation-errors") as any).style.display =
      "none";

    const taskApp: AppTasks = new AppTasks();

    taskApp.addTask(inputTaskNameValue, inputTaskDescValue);

    (document.getElementById("taskNameInput") as any).value = "";
    (document.getElementById("taskDescInput") as any).value = "";
    //process new task
    (document.getElementById("tasks-added-info") as any).style.display =
      "block";
  }

  handleClickComplete() {
    logger.info("handleClickComplete");
  }

  handleTasksChange() {
    const tasks = store.getState().tasks;
    //logger.info("tasks:", tasks);

    const parentElement = document.getElementById("app-task-details");

    if (!!parentElement) {
      parentElement.innerHTML = "";
      for (const task of tasks) {
        const newChildElement = document.createElement("div");
        newChildElement.dataset.task_id = task.id;
        var templateContent = `
        
         <div class="list-group">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${task.taskName}</h5>
                <small>${task.id}</small>
              </div>
            
              <p class="mb-1">${task.taskDesc}</p>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  class="btn btn-danger me-md-2 app-delete-task"
                  type="button" 
                >
                  Delete task
                </button>
                <button
                  class="btn btn-success app-complete-task"
                  type="button"
                  Mark complete
                </button>
              </div>
              <hr>
            </div> 
        
        `;

        if (task.completed === true) {
          templateContent = `
        
         <div class="list-group">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1"><strike>${task.taskName}</strike></h5>
                <small>${task.id}</small>
              </div>
            
              <p class="mb-1"><strike>${task.taskDesc}</strike></p>
       
              <hr>
            </div> 
        
        `;
        }

        newChildElement.innerHTML = templateContent;
        parentElement.appendChild(newChildElement);
      }
    }
  }

  setupListners() {
    //run once when init app
    logger.info("add listner for add task button");

    const element: any = document.querySelector("#add-new-task-btn");

    if (!!element) {
      element.addEventListener("click", this.handleAddTasks);
    }

    const unsubscribe = store.subscribe(this.handleTasksChange);
    //handle unsubscribe if reqd
  }
}
