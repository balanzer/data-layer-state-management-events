import { Logger } from "../logger/log";
import { addTask } from "../store/slice/tasks";
import store from "../store/store";

//global to handle logs within click events
const logger = new Logger("app-tasks");

export class AppTasks {
  constructor() {
    logger.info("init todo-app");
  }

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
    logger.info("add new task ", taskName, ", ", taskDesc);
    store.dispatch(addTask({ taskName: taskName, taskDesc: taskDesc }));
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

  setupListners() {
    //run once when init app
    logger.info("add listner for add task button");

    const element: any = document.querySelector("#add-new-task-btn");

    if (!!element) {
      element.addEventListener("click", this.handleAddTasks);
    }
  }
}
