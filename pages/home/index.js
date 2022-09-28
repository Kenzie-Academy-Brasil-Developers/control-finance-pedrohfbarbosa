/* Desenvolva sua lógica aqui */

function resetButtons(){
    const allButtons = document.querySelectorAll("button")
    allButtons.forEach((element) => element.addEventListener("click",(event)=>event.preventDefault()))
}
resetButtons()

function calculateTotal(arr){
    return (arr.map((element) => element.value).reduce((previous, current) => previous + current)).toFixed(2)
}

let cont = 0
if (insertedValues.length > 0){
    cont = calculateTotal(insertedValues)
}
let sumTitle = document.getElementById("sum-title")
sumTitle.innerText = "Soma dos valores"

let sumValues = document.getElementById("sum")
sumValues.innerHTML = `R$ ${cont}`

let cardsWrapper = document.querySelector(".cards-wrapper")

function emptyCards(){
    let emptyCardWrapper = document.createElement("div")
    emptyCardWrapper.classList.add("empty-cards")
    emptyCardWrapper.setAttribute("data-control-modal", "open-modal")
    emptyCardWrapper.innerHTML = `
        <h3>Nenhum valor cadastrado</h3>
        <span>Registrar novo valor</span>
    `
    emptyCardWrapper.addEventListener("click",function(){
        listModal()
    })
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
    
    btnDeleteImg.addEventListener("click", (event)=>{
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

let btnAllNav = document.getElementById("btn-all")
let btnEntriesNav = document.getElementById("btn-entries")
let btnExitsNav = document.getElementById("btn-exit")

btnAllNav.addEventListener("click", function(){
    if(insertedValues.length > 0){
        sumTitle.innerText = "Soma dos valores"        
        listCards(insertedValues)
    }else {
        sumTitle.innerText = "Soma dos valores"
        cont = 0
        sumValues.innerHTML = `R$ ${cont}`
        listCards(insertedValues)
    }
})

btnEntriesNav.addEventListener("click", function(){    
    let allEntries = insertedValues.filter((element) => element.categoryID == 0)
    if (allEntries.length > 0){
        sumTitle.innerText = "Soma dos valores de entrada"
        listCards(allEntries)
    }else{
        sumTitle.innerText = "Soma dos valores de entrada"
        cont = 0
        sumValues.innerHTML = `R$ ${cont}`
        listCards(allEntries)
    }
})

btnExitsNav.addEventListener("click", function(){
    let allExits = insertedValues.filter((element) => element.categoryID == 1)
    if (allExits.length > 0){
        sumTitle.innerText = "Soma dos valores de saida"
        listCards(allExits)
    }else {
        sumTitle.innerText = "Soma dos valores de saida"
        cont = 0
        sumValues.innerHTML = `R$ ${cont}`
        listCards(allExits)
    }
})

listCards(insertedValues)
//listEntries(insertedValues)
//listExits(insertedValues)