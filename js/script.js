const button = document.getElementById("btn");
const list = document.getElementById("list");
const input_text = document.querySelector("input[name='task']");



const tarefas = []
const minhaTarefas = localStorage.getItem('minha-to-do-list')
if(minhaTarefas){
    const existe = JSON.parse(minhaTarefas)

existe.forEach((ex) => createTask(ex.texto, ex.check))
}



function toLocalStorage(){
    localStorage.setItem('minha-to-do-list', JSON.stringify(tarefas))
}


function createTask(entrada, estado){

    let id = Math.floor(Math.random() * 10000);

    const input_check = document.createElement("input");
    input_check.type = "checkbox";
    input_check.id = `check-task-${id}`;
    input_check.checked = estado;

    const task_text = document.createElement("label");
    task_text.innerText = entrada;
    task_text.htmlFor = `check-task-${id}`;

    const delete_btn = document.createElement("button");
    delete_btn.className = "delete_btn";
    delete_btn.innerHTML = "<i class='fa-solid fa-trash'></i>";

    const edit_btn = document.createElement("button");
    edit_btn.className = "edit_btn";
    edit_btn.innerHTML = "<i class='fa-solid fa-pen'></i>";

    const list_task = document.createElement("li");
    list_task.className = "list_task";
    list_task.append(input_check, task_text, edit_btn, delete_btn);
    list.appendChild(list_task);
    if(estado){
        list_task.classList.add("teste")
    }

    delete_btn.addEventListener('click', (ev) => {
        const task_to_remove = ev.currentTarget.parentNode;
        task_to_remove.remove();
    })

    
    input_check.addEventListener('change', (ev) => {
        const check = ev.currentTarget.parentNode;
        // check.classList.toggle("teste");
        // input_check.checked = estado;
        const novoEstado = input_check.checked;
        check.classList.toggle("teste");
        // console.log(check)
        // console.log(check.id)
        console.log(novoEstado)
        updateTask(novoEstado, id)
    })

    edit_btn.addEventListener('click', (ev) => {
        const edit_task = ev.currentTarget.parentNode.querySelector("label")
        const newText = prompt("Editar Tarefa: ", edit_task.innerText);
        edit_task.innerText = newText;
    })

    tarefas.push({id: id, texto: entrada, check: estado})
    toLocalStorage()
}

function updateTask(estado, id){
    const tarefaAAtualizar = tarefas.find(tarefa => tarefa.id == id)
    if(tarefaAAtualizar){
        tarefaAAtualizar.check = estado
        toLocalStorage()
    }
}

function handleAddToList(){

    if(input_text.value == "") return

    createTask(input_text.value);

    input_text.value = "";

}

button.addEventListener('click', (ev) => {
    ev.preventDefault()
    handleAddToList()
})