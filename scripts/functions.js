function resetButtons(){
    const allButtons = document.querySelectorAll("button")
    allButtons.forEach((element) => element.addEventListener("click",(event)=>event.preventDefault()))
}

function calculateTotal(arr){
    return (arr.map((element) => element.value).reduce((previous, current) => previous + current)).toFixed(2)
}

function emptyCards(){
    let emptyCardWrapper = document.createElement("div")
    emptyCardWrapper.classList.add("empty-cards")
    emptyCardWrapper.setAttribute("data-control-modal", "open-modal")
    emptyCardWrapper.innerHTML = `
        <h3>Nenhum valor cadastrado</h3>
        <span>Registrar novo valor</span>
    `
    emptyCardWrapper.addEventListener("click", listModal)
    cardsWrapper.innerHTML = ""
    cardsWrapper.appendChild(emptyCardWrapper)
}

function createCard(item){
    let card = document.createElement("li")
    card.classList.add("card")
    
    let itemValue = document.createElement("span")
    itemValue.setAttribute("id", "item-value")
    itemValue.innerHTML = `R$ ${(item.value).toFixed(2)}`
    card.appendChild(itemValue)

    let cardContent = document.createElement("div")
    
    cardContent.classList.add("card-content")
    cardContent.classList.add("card-content")
    cardContent.innerHTML = `
        <span>${valuesCategory[item.categoryID]}</span>
    `
    card.appendChild(cardContent)

    let btnDeleteCard = document.createElement("button")
    btnDeleteCard.classList.add("delete-card")

    let btnDeleteImg = document.createElement("img")
    btnDeleteImg.src = "../../assets/img/trash.svg"
    btnDeleteImg.setAttribute("id", `delete_${item.id}`)
    btnDeleteCard.appendChild(btnDeleteImg)    
    
    btnDeleteImg.addEventListener("click", function(event){
        cont -= item.value
        sumValues.innerHTML = `R$ ${cont}`

        cardId = Number(btnDeleteImg.id.substring(7))
        cardIndex = insertedValues.findIndex((element) => element.id == cardId)
        insertedValues.splice(cardIndex, 1)
        event.composedPath()[3].remove()  
        let ulChildren = [...event.composedPath()[4].children]
        if (ulChildren.length == 0){
            emptyCards()
        } 
    })
    cardContent.appendChild(btnDeleteCard)

    return card
}

function listCards(arr){
    if (arr.length > 0){
        cardsWrapper.innerHTML = ""
        cont = calculateTotal(arr)
        sumValues.innerHTML = `R$ ${cont}`
        arr.forEach((element) => cardsWrapper.appendChild(createCard(element)))
    } else {
        emptyCards()
    }
}

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