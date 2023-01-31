const botao = document.getElementById('Btn')
let item = 0

function createInput(name, id, type){
    let input = document.createElement('input')
    input.name = name
    input.id = id
    input.type= type
    return input
}

function createLabel(htmlfor, text){
    let label = document.createElement('label')
    label.htmlFor = htmlfor
    label.innerText = text
    return label
}

function createBtn(img){
    let btn = document.createElement('button')
    let btnImg = document.createElement('img')
    btnImg.src = img
    btn.appendChild(btnImg)
    return btn
}

botao.addEventListener('click', function(){
    const tarefa = document.querySelector("input[name='tarefa']").value
    const ul = document.getElementById('lista')
    const novaTarefa = document.createElement('li')
    const newItem = item
    item ++

    if(tarefa.length > 0){
        const removeBtn = createBtn("assets/img/remove.svg")
        const inputCheck = createInput('check-tarefa' + newItem, 'check-tarefa' + newItem, 'checkbox')
        const labelItem = createLabel('check-tarefa' + newItem, tarefa)

        removeBtn.addEventListener('click', function(ev){
            const removeTarefa = ev.currentTarget.parentNode
            removeTarefa.remove()
        })

        novaTarefa.append(removeBtn, inputCheck, labelItem)
        ul.appendChild(novaTarefa)

        document.getElementById('tarefa').value = ""
    } else {
        alert("Insira uma tarefa!")
    }  
})