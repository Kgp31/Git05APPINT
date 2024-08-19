const inputColor = document.getElementById('inputColor'); // Corregido el id
const boton = document.getElementById('Boton'); // Corregido el id
const textoHexa = document.getElementById('textoHexa');
const cardColor = document.getElementById('cardColor');

boton.addEventListener('click', () => { // Corregido el nombre de la variable
    textoHexa.textContent = inputColor.value; // Corregido el nombre de la variable
    cardColor.style.backgroundColor = inputColor.value; // Corregido el nombre de la variable
});
