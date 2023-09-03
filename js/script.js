const button = document.getElementById("btn");
const list = document.getElementById("list");
const input_text = document.querySelector("input[name='task']");
let to_do_list = [];
let contador = 0;

// inicialização: verifica se a chave está armazenada no localStorage e renderiza os elementos, caso estejam salvos
const task_list = localStorage.getItem('to-do-list')
if(task_list){
    const tasks = JSON.parse(task_list)
    tasks.forEach((task) => createTask(task.text, task.check))
}

// armazena a lista no localStorage
function toLocalStorage(){
    localStorage.setItem('to-do-list', JSON.stringify(to_do_list))
}

// cria os elementos da lista
function createTask(text_task, checked_state){

    let id = contador++;

    const input_check = document.createElement("input");
    input_check.type = "checkbox";
    input_check.id = `check-task-${id}`;
    input_check.checked = checked_state;

    const task_text = document.createElement("label");
    task_text.innerText = text_task;
    task_text.htmlFor = `check-task-${id}`;

    const delete_btn = document.createElement("button");
    delete_btn.className = "delete_btn";
    delete_btn.innerHTML = "<i class='fa-solid fa-trash'></i>";

    const edit_btn = document.createElement("button");
    edit_btn.className = "edit_btn";
    edit_btn.innerHTML = "<i class='fa-solid fa-pen'></i>";

    const list_task = document.createElement("li");
    list_task.className = "list_task";
    list_task.id = id;
    list_task.append(input_check, task_text, edit_btn, delete_btn);
    list.appendChild(list_task);
    if(checked_state){
        list_task.classList.add("checked_style")
    }

    delete_btn.addEventListener('click', (ev) => {
        const task_to_remove = ev.currentTarget.parentNode;
        // remove a tarefa do local storage
        to_do_list = to_do_list.filter(tarefa => tarefa.id != task_to_remove.id)
        toLocalStorage()
        // remove a tarefa da tela instantaneamente
        task_to_remove.remove();
    })

    input_check.addEventListener('change', (ev) => {
        const check = ev.currentTarget.parentNode;
        const newCheckedState = input_check.checked;
        check.classList.toggle("checked_style");
        // atualiza o novo estado do input na tarefa armazenada no localStorage
        updateTask(newCheckedState, id)
    })

    edit_btn.addEventListener('click', (ev) => {
        const edit_task = ev.currentTarget.parentNode.querySelector("label");
        const newText = prompt("Editar Tarefa: ", edit_task.innerText);
        edit_task.innerText = newText;
        // atualiza o novo texto da tarefa armazenada no localStorage
        updateText(newText, id)
    })

    to_do_list.push({id: id, text: text_task, check: checked_state})
    toLocalStorage()
}

// responsável por atualizar o estado do input na tarefa armazenada no localStorage
function updateTask(checked_state, id){
    const taskToUpdate = to_do_list.find(tsk => tsk.id == id)
    if(taskToUpdate){
        taskToUpdate.check = checked_state
        toLocalStorage()
    }
}

// responsável por atualizar o novo text da tarefa armazenada no localStorage
function updateText(newText, id){
    const textToUpdate = to_do_list.find(tsk => tsk.id == id)
    if(textToUpdate){
        textToUpdate.text = newText
        toLocalStorage()
    }
}

// adiciona nova tarefa
function handleAddToList(){

    if(input_text.value == "") return

    createTask(input_text.value, false);

    input_text.value = "";

}

button.addEventListener('click', (ev) => {
    ev.preventDefault()
    handleAddToList()
})