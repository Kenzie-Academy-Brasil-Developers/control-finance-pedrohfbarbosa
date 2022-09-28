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

function eventListenerAllValues(){
    if(insertedValues.length > 0){
        sumTitle.innerText = "Soma dos valores"        
        listCards(insertedValues)
    }else {
        sumTitle.innerText = "Soma dos valores"
        cont = 0
        sumValues.innerHTML = `R$ ${cont}`
        listCards(insertedValues)
    }
}

function eventListenerEntries(){    
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
}

function eventListenerExits(){
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
}

