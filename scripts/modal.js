/* Desenvolva sua lógica aqui */
const btnsOpen = document.querySelectorAll("[data-control-modal]")
let arrBtnsOpen = [...btnsOpen]

let body = document.querySelector("body")

arrBtnsOpen.forEach((element) => element.addEventListener("click", listModal))




