import { AppLogEvents } from "../data/events/app-events";
import { Logger } from "../logger/log";
import { addTask, completedTask, removeTask } from "../store/slice/tasks";
import store from "../store/store";

//global to handle logs within click events
const logger = new Logger("app-tasks");

const common_taks = [
  {
    taskName: "Deep Cleaning",
    taskDesc:
      "Cleaning inside and outside of kitchen cabinets, scrubbing out the fridge, etc.",
  },
  {
    taskName: "Household",
    taskDesc: "Making the bed, cleaning dishes, laundry, tidying up.",
  },
  {
    taskName: "Today Evening",
    taskDesc: "Prepare and eat dinner, do dishes, read, journal.",
  },
  {
    taskName: "Today Errands",
    taskDesc: "Grocery shopping, picking up dry cleaning.",
  },
  {
    taskName: "Physical Activity",
    taskDesc: "Exercise, stretching, yoga.",
  },
  {
    taskName: "Meal Preparation",
    taskDesc: "Having breakfast, lunch, and dinner.",
  },
  {
    taskName: "Self-Care",
    taskDesc: "Reading, journaling, meditation. ",
  },
  {
    taskName: "Visit Parks",
    taskDesc: "Visit parks, splash pads, and nature centers.",
  },
  {
    taskName: "Night Camping",
    taskDesc: "Camp in the backyard.",
  },
  {
    taskName: "todo events",
    taskDesc: "Participate in church, community, and library events.",
  },
  {
    taskName: "ice cream",
    taskDesc: "Take a bike ride to get ice cream.",
  },
  {
    taskName: "Hydration",
    taskDesc: "Drinking water throughout the day.",
  },
];

export class AppTasks {
  constructor() {
    logger.info("init todo-app");
    this.addListners();
  }

  getRandomTask() {
    const index = Math.floor(Math.random() * common_taks.length);
    return common_taks[index];
  }

  addListners() {}
  addDummyTasks() {
    // run once
    //add some tasks
    const task1 = this.getRandomTask();
    const task2 = this.getRandomTask();
    this.addTask(task1.taskName, task1.taskDesc);
    this.addTask(task2.taskName, task2.taskDesc);
  }
  addTask(taskName: string, taskDesc: string) {
    //logger.info("add new task ", taskName, ", ", taskDesc);
    store.dispatch(addTask({ taskName: taskName, taskDesc: taskDesc }));
    AppLogEvents.addAppLogEvent("task - new");
  }

  removeTask(taskID: number) {
    // logger.info("remove task with id ", taskID);
    store.dispatch(removeTask({ id: taskID }));
    AppLogEvents.addAppLogEvent("task - delete");
  }

  markComplete(taskID: number) {
    //logger.info("mark task with id ", taskID, " as complete");
    store.dispatch(completedTask({ id: taskID }));
    AppLogEvents.addAppLogEvent("task - complete");
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
    const task1 = taskApp.getRandomTask();
    (document.getElementById("taskNameInput") as any).value = task1.taskName;
    (document.getElementById("taskDescInput") as any).value = task1.taskDesc;
    //process new task
    (document.getElementById("tasks-added-info") as any).style.display =
      "block";
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
                  type="button" onclick="handleListnerTaskRemove(${task.id})"
                >
                  Delete task
                </button>
                <button
                  class="btn btn-success app-complete-task"
                  type="button" onclick="handleListnerTaskComplete(${task.id})">
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
