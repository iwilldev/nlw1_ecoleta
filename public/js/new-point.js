

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json()) // arrow function res - parâmetro da função / res.json é o valor em return
    .then(states => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = `<option value="">Selecione sua Cidade</option>`
    citySelect.disabled = true
    fetch(url)
    .then(res => res.json()) // arrow function res - parâmetro da função / res.json é o valor em return
    .then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) 

// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    // adicionando e removendo a classe selected
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = event.target.dataset.id

    // verificar se existem itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    // se estiver selecionado
    if (alreadySelected >= 0){
        // remover da lista
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{
        //adicionar a seleção
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems


    // atualizar ao input hidden
}