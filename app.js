// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`


const form     = document.querySelector('form')
const input    = document.querySelector('input')
const errorMsg = document.querySelector('.error-msg')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault()

    if(input.value === ""){
        errorMsg.textContent = "Oops... Veuillez remplir l'input.";
        return;
    } else{
        errorMsg.textContent = "";
        wikiApiCall(input.value)
    }
}

async function wikiApiCall(searchInput){

    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)

    const data = await response.json()  //Pour analyser le corps de la requête (le body)
    console.log(data);

    createCards(data.query.search)
}

const resultDisplay = document.querySelector('.results-display')

function createCards(data){
    if(!data.length){
        errorMsg.textContent = "Oops... Aucun résultat.";
        return;
    }
    data.forEach(el => {
        const url = `https://en.wikipedia.org/?curid=${el.pageid}`
        const card = document.createElement('div'); //Creation de la card
        card.className = 'result-item'; //On lui ajoute une classe
        card.innerHTML = `
        <h3 class="result-title">
            <a href="${url}" target ="_blank">${el.title}</a>
        </h3>
        <a href="${url}" class="result-link" target ="_blank">${url}<a/>
        <span class="result-snippet">${el.snippet}</span>
        <br>
        ` //On lui a ajouté son contenu interne 

        resultDisplay.appendChild(card) // On ajoute cette card (card) a .results-display. Ce sera l'enfant de .results-display
    });
}