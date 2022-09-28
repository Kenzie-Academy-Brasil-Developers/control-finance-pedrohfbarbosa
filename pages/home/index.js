/* Desenvolva sua lógica aqui */
resetButtons()

let cont = 0

if (insertedValues.length > 0){
    cont = calculateTotal(insertedValues)
}

let sumTitle = document.getElementById("sum-title")
sumTitle.innerText = "Soma dos valores"

let sumValues = document.getElementById("sum")
sumValues.innerHTML = `R$ ${cont}`

let cardsWrapper = document.querySelector(".cards-wrapper")

let btnAllNav = document.getElementById("btn-all")
let btnEntriesNav = document.getElementById("btn-entries")
let btnExitsNav = document.getElementById("btn-exit")

btnAllNav.addEventListener("click", eventListenerAllValues)

btnEntriesNav.addEventListener("click", eventListenerEntries)

btnExitsNav.addEventListener("click", eventListenerExits)

listCards(insertedValues)
