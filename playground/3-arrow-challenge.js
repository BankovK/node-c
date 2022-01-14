const tasks = {
    tasks: [{
        text: 'Task1',
        completed: true
    },{
        text: 'Task2',
        completed: false
    }, {
        text: 'Task3',
        completed: false
    }],
    getTasksToDo() {
        return this.tasks.filter(task => !task.completed)
    }
}

console.log(tasks.getTasksToDo())