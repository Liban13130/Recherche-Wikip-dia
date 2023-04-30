const form     = document.querySelector('form')
const input    = document.querySelector('input')
const errorMsg = document.querySelector('.error-msg')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    console.log(e);

    if(input.value === ""){
        errorMsg.textContent = "Oops... Veuillez remplir l'input.";
        return;
    } else{
        errorMsg.textContent = "";
        wikiApiCall(input.value)
    }
}