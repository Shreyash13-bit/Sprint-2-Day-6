const TaskStatus = {
  PENDING: Symbol('pending'),
  DONE: Symbol('done')
};

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}
const gen = idGenerator();

export class Task {
  constructor(title = "Untitled") {
    this.id = gen.next().value;
    this.title = title;
    this.completed = false;
    this.status = TaskStatus.PENDING;
  }
}

export class TodoList {
  constructor() {
    this.tasks = [];
    this.taskMap = new Map();
    this.taskSet = new Set();
    this.taskRefs = new WeakMap(); 
  }

  addTask(title) {
    const task = new Task(title);
    this.tasks.push(task);
    this.taskMap.set(task.id, task);
    this.taskSet.add(task);
    return task;
  }

  completeTask(id) {
    const task = this.taskMap.get(id);
    if (task) {
      task.completed = true;
      task.status = Symbol('done'); 
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.taskMap.delete(id);
  }

  listTasks() {
    return [...this.tasks];
  }
}
