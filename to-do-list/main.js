// Task Class: Represens Task

class Task {
    constructor(title){
        this.title = title;
    }
}

// UI Class: User Interface tasks

class UI {
    static displayList() {
    //    const savedTask = [
    //     {   
    //         title: 'Go to the gym'
    //     },
    //     {   
    //         title: 'Read a book'
    //     },
    //     {   
    //         title: 'Go shopping'
    //     }
    //    ];

        // const storedTasks = savedTask; 
        const storedTasks = Store.getTasks();
        storedTasks.forEach((task) => UI.addTaskToList(task));
    }

    static addTaskToList(task){
        
        const list = document.getElementById('task-list');
        const singleTask = document.createElement('li');
        singleTask.innerHTML = `${task.title} <a href="#" class="btn btn-danger btn-sm delete">X</a>`;
        
        list.appendChild(singleTask);
        
    }
    static clearField() {
        document.querySelector('.form-control').value = "";
    }

    static getTask() {
        const input = document.querySelector('.form-control').value;
        const task = new Task (input);    
        if (input) {
            UI.addTaskToList(task);
            UI.showAlert("Task Added", "success");
            UI.clearField();
            Store.addTask(task);
        } else {
            UI.showAlert("Please Fill in Field", "danger");
        }
        
    }

    static deleteTask(el) {
        if(el.classList.contains('delete')){
            el.parentElement.remove();
        }
    }

    static showAlert (message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#list-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000);
    }
}
// Store Class: Handles Storage


class Store {
    static getTasks() {
      let tasks;
      if(localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
  
      return tasks;
    }
  
    static addTask(task) {
      const tasks = Store.getTasks();
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    static removeTask(title) {
      const tasks = Store.getTasks();
  
      tasks.forEach((task, index) => {
        if(task.title === title) {
          tasks.splice(index, 1);
        }
      });
  
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  

// Event: Display List

document.addEventListener('DOMContentLoaded', UI.displayList);

// Event: Add task

document.querySelector('.add').addEventListener('click', UI.getTask);
document.body.addEventListener('keyup', (e) => {
    if(e.code === 'Enter'){
        UI.getTask();
    }
});


// Event: Remove Task

document.querySelector('#task-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        UI.deleteTask(e.target);
        UI.showAlert("Task Removed", "success");
        Store.removeTask(e.target.parentElement.textContent.slice(0,-2)); 
    }
})

