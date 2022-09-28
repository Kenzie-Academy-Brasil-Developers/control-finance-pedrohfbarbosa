/* Desenvolva sua lógica aqui */
const btnsOpen = document.querySelectorAll("[data-control-modal]")

let body = document.querySelector("body")

function createModal() {
    let modalWrapper = document.createElement("div")
    modalWrapper.classList.add("modal-wrapper")

    let modal = document.createElement("div")
    modal.classList.add("modal")
    modalWrapper.appendChild(modal)

    let modalHeader = document.createElement("div")
    modalHeader.classList.add("modal-header")
    modal.appendChild(modalHeader)

    let modalTitle = document.createElement("h3")
    modalTitle.innerText = "Registro de Valor"
    modalHeader.appendChild(modalTitle)

    let btnClose = document.createElement("button")
    btnClose.innerText = "x"
    btnClose.addEventListener("click", function(event) {
        insertedValue = {}
        event.composedPath()[3].remove()
    })
    modalHeader.appendChild(btnClose)

    let modalContent = document.createElement("div")
    modalContent.classList.add("modal-content")
    modal.appendChild(modalContent)

    let modalContentTitle = document.createElement("h3")
    modalContentTitle.innerText = "Digite o valor e em seguida aperte no botao referente ao tipo de valor"
    modalContent.appendChild(modalContentTitle)

    let form = document.createElement("form")
    form.classList.add("insert-value")
    modalContent.appendChild(form)

    let inputWrapper = document.createElement("div")
    inputWrapper.classList.add("input-wrapper")
    inputWrapper.innerHTML = `
        <label for="entry-value">Valor</label>
    `
    let entryValue = document.createElement("input")
    entryValue.type = "number"
    entryValue.setAttribute("id", "entry-value")
    entryValue.placeholder = "R$ 00,00"

    inputWrapper.appendChild(entryValue)
    form.appendChild(inputWrapper)

    let valueType = document.createElement("div")
    valueType.classList.add("value-types")
    valueType.setAttribute("id", "value-type")
    valueType.innerHTML = `
        <h4>Tipo de valor</h4>
    `
    form.appendChild(valueType)

    let btnEntrada = document.createElement("input")
    btnEntrada.type = "button"
    btnEntrada.value = "Entrada"
    btnEntrada.setAttribute("id", "btn_0")
    btnEntrada.addEventListener("click", function(){
        insertedValue.categoryID = 0
    })
    valueType.appendChild(btnEntrada)
    

    let btnSaida = document.createElement("input")
    btnSaida.type = "button"
    btnSaida.value = "Saida"
    btnSaida.setAttribute("id", "btn_1")
    btnSaida.addEventListener("click", function(){
        insertedValue.categoryID = 1
    })
    valueType.appendChild(btnSaida)

    let btnsWrapper = document.createElement("div")
    btnsWrapper.classList.add("btns-wrapper")
    form.appendChild(btnsWrapper)

    let btnCancel = document.createElement("button")
    btnCancel.innerHTML = "Cancelar"
    btnCancel.addEventListener("click", function(event) {
        insertedValue = {}
        event.composedPath()[5].remove()
    })
    btnsWrapper.appendChild(btnCancel)

    let btnRegisterValue = document.createElement("button")
    btnRegisterValue.innerHTML = "Inserir valor"
    btnRegisterValue.type = "submit"
    btnRegisterValue.addEventListener("click", registerEntry)

    btnsWrapper.appendChild(btnRegisterValue)

    return modalWrapper
}

function listModal(){
    body.appendChild(createModal())
    resetButtons()
}

[...btnsOpen].forEach((element) => element.addEventListener("click", function(){
    listModal()
}))

function registerEntry(event){
    let entryValue = document.getElementById("entry-value").value   
    insertedValue.value = Number(entryValue)
    if (insertedValues.length == 0){
        insertedValue.id = 1
    }else{
        insertedValue.id = insertedValues[insertedValues.length-1].id + 1
    }
    if (Object.keys(insertedValue).length == 3){
        insertedValues.push(insertedValue)       
        insertedValue = {}
        event.composedPath()[5].remove()
        sumTitle.innerText = "Soma dos valores" 
        listCards(insertedValues)
    }else {
        alert("Selecione um tipo de valor")
    }
   
}


