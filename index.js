const inputColor = document.getElementById('inputColor'); 
const boton = document.getElementById('Boton'); 
const textoHexa = document.getElementById('textoHexa');
const cardColor = document.getElementById('cardColor');

boton.addEventListener('click', () => { 
    textoHexa.textContent = inputColor.value;
    cardColor.style.backgroundColor = inputColor.value; 
});
