const button = document.getElementById("btn");
const list = document.getElementById("list");
const input_text = document.querySelector("input[name='task']");
let tarefas = [];
let contador = 0;

// inicialização: verifica se a chave está armazenada no localStorage e renderiza os elementos, caso estejam salvos
const minhaTarefas = localStorage.getItem('minha-to-do-list')
if(minhaTarefas){
    const existe = JSON.parse(minhaTarefas)
    existe.forEach((ex) => createTask(ex.texto, ex.check))
}

// armazena a lista no localStorage
function toLocalStorage(){
    localStorage.setItem('minha-to-do-list', JSON.stringify(tarefas))
}

// cria os elementos da lista
function createTask(entrada, estado){

    let id = contador++;

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
    list_task.id = id;
    list_task.append(input_check, task_text, edit_btn, delete_btn);
    list.appendChild(list_task);
    if(estado){
        list_task.classList.add("teste")
    }

    delete_btn.addEventListener('click', (ev) => {
        const task_to_remove = ev.currentTarget.parentNode;
        // remove a tarefa do local storage
        tarefas = tarefas.filter(tarefa => tarefa.id != task_to_remove.id)
        toLocalStorage()
        // remove a tarefa da tela instantaneamente
        task_to_remove.remove();
    })

    input_check.addEventListener('change', (ev) => {
        const check = ev.currentTarget.parentNode;
        const novoEstado = input_check.checked;
        check.classList.toggle("teste");
        // atualiza o novo estado do input na tarefa armazenada no localStorage
        updateTask(novoEstado, id)
    })

    edit_btn.addEventListener('click', (ev) => {
        const edit_task = ev.currentTarget.parentNode.querySelector("label");
        const newText = prompt("Editar Tarefa: ", edit_task.innerText);
        edit_task.innerText = newText;
        // atualiza o novo texto da tarefa armazenada no localStorage
        updateText(newText, id)
    })

    tarefas.push({id: id, texto: entrada, check: estado})
    toLocalStorage()
}

// responsável por atualizar o estado do input na tarefa armazenada no localStorage
function updateTask(estado, id){
    const tarefaAAtualizar = tarefas.find(tarefa => tarefa.id == id)
    if(tarefaAAtualizar){
        tarefaAAtualizar.check = estado
        toLocalStorage()
    }
}

// responsável por atualizar o novo texto da tarefa armazenada no localStorage
function updateText(novoTexto, id){
    const texto_a_atualizar = tarefas.find(tarefa => tarefa.id == id)
    if(texto_a_atualizar){
        texto_a_atualizar.texto = novoTexto
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