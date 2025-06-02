import { TodoList } from './todo.js';

const todo = new TodoList();
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');

addBtn.addEventListener('click', () => {
  const title = taskInput.value;
  if (!title) return;

  const task = todo.addTask(title);
  renderTasks(todo.listTasks());
  taskInput.value = '';
});

function renderTasks(tasks) {
  taskList.innerHTML = '';
  for (const { id, title, completed } of tasks) {
    const li = document.createElement('li');
    li.innerHTML = `${title} ${completed ? '✅' : ''} 
      <button onclick="complete(${id})">Done</button>
      <button onclick="remove(${id})">Delete</button>`;
    taskList.appendChild(li);
  }
}

window.complete = (id) => {
  todo.completeTask(id);
  renderTasks(todo.listTasks());
};

window.remove = (id) => {
  todo.deleteTask(id);
  renderTasks(todo.listTasks());
};

const saveTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Tasks saved!');
    }, 1000);
  });
};

saveTasks().then(msg => console.log(msg));

const allTitles = Array.from(todo.listTasks(), t => t.title);
const copies = todo.listTasks().map(t => Object.assign({}, t));
console.log('Task titles:', allTitles);
console.log('Cloned tasks:', copies);

console.log('First task === First copy?', Object.is(todo.tasks[0], copies[0]));
