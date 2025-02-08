document.addEventListener("DOMContentLoaded",() => {
    const storedTask=JSON.parse(localStorage.getItem("tasks"));
        if(storedTask)
    {storedTask.forEach((task) =>tasks.push(task));
        updateTaskList();
        updateStats();
    }
    });
let tasks=[];
const saveTasks =()=>
{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
const addTask=() => {
    const taskInput=document.getElementById('taskInput');
    const text=taskInput.value.trim();
    if(text)
    {tasks.push({text:text,completed:false});
updateTaskList();
updateStats();
taskInput.value="";
changeStatus();
saveTasks();}

};
const toggleTaskComplete=(index) => {
    tasks[index].completed=!tasks[index].completed;
    updateTaskList();
    updateStats();
    changeStatus();
    saveTasks();

};
const deleteTask=(index)=>
{
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    changeStatus();
    saveTasks();
}
const editTask=(index) =>{
    const taskInput=document.getElementById('taskInput');
    taskInput.value=tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
    changeStatus();
    saveTasks();
};
const changeStatus=() =>
{
    const completedTasks = tasks.filter(task => task.completed).length;
   const totalTasks=tasks.length;
   const number=document.getElementById('numbers');
   number.innerHTML=`${completedTasks}  /  ${totalTasks}`;
   if(totalTasks==completedTasks)
    addConfetti();

}
const updateStats =() =>
{
   const completedTasks = tasks.filter(task => task.completed).length;
   const totalTasks=tasks.length;
   const progress=(completedTasks/totalTasks)*100;
   const progressBar=document.getElementById("progress");
   progressBar.style.width=`${progress}%`;
  
}
const updateTaskList=() => {
    const taskList=document.querySelector('.task-list');
    taskList.innerHTML="";
    tasks.forEach((task,index) => {
        const listItems=document.createElement('li');
        listItems.innerHTML=`
        <div class="taskItem">
        <div class="task ${task.completed? 'completed':""}">
        <input type="checkbox" class ="checkbox " ${task.completed? "checked" : ""}/>
        <p>${task.text}</p>
        </div>
        <div class="icons">
        <img src="img1.png" onClick="editTask(${index})"/>
        <img src="image.png" onClick="deleteTask(${index})"/>
        </div>
        </div>`;
        listItems.addEventListener('change', ()=> toggleTaskComplete(index))
        

        taskList.appendChild(listItems);
});
};

document.getElementById('newTask').addEventListener('click',function(e)
{
    e.preventDefault(); 
    addTask();
});
const addConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
};
