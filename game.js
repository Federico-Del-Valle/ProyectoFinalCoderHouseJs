    //Elementos del DOM
const btn = document.querySelector("#jugar")
const btnLetras = document.querySelectorAll("#letras button")
    // Variables
const palabras = ["Luxemburgo", "Argentina", "Dinamarca", "Australia", "Sudafrica", "Finlandia", "Groenlandia", "Jordania", "Somalia", "Afganistan", "Letonia", "Estonia", "Azerbaiyan","Vietnam", "Madagascar"];
const parrafo = document.querySelector("#palabra_adivinar")
let valorAzar;
let cantErorres ;
let cantAciertos;
// EventListener
btn.addEventListener("click", iniciar)

// Gameover permite que las letras del alfabeto esten desabilitadas
gameOver();

for (let i = 0; i< btnLetras.length; i++) {
    btnLetras[ i ].addEventListener("click", clickLetras)
}
// Funciones
function iniciar(event) {
    var canvas = document.querySelector("#stickman")
    btn.disabled = true
    cantErorres = 0;
    cantAciertos = 0;
    parrafo.innerHTML = "";
    let cantPalabras = palabras.length;
    valorAzar = palabras[Math.floor(Math.random()* palabras.length)];
    for (let i = 0; i < valorAzar.length; i++) {
        const span = document.createElement( 'span' );
        parrafo.appendChild( span );
    }
    for (let i = 0; i < btnLetras.length; i++){
        btnLetras[i].disabled = false;
    }
    dibujar()
}
function clickLetras(event) {
    const spans = document.querySelectorAll("#palabra_adivinar span")
    const button = event.target;
    button.disabled = true
    const letra = button.innerHTML.toLowerCase()
    const palabraAzar = valorAzar.toLowerCase()
    let acerto = false

    for( let i = 0; i < palabraAzar.length; i++) {
        if ( letra == palabraAzar[i]){
            spans[i].innerHTML = letra
            cantAciertos++;
            acerto = true
        }
    }
    if( acerto == false){
        cantErorres++;
            dibujar()
    } else if (cantAciertos === palabraAzar.length){
        Swal.fire({
            icon: 'success',
            title: 'Ganaste',
            text: 'La palabra era '+ valorAzar,
        })
    }
}
function gameOver() {
    for (let i = 0; i < btnLetras.length; i++){
        btnLetras[i].disabled = true;
    }
    btn.disabled = false;
}

// Funcion que dibuja el ahorcado a medida que se cometen errores
function dibujar() {
    var canvas = document.querySelector("#stickman")
    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // Base
        ctx.beginPath();
        ctx.moveTo(30, 200);
        ctx.lineTo(30, 10);
        ctx.lineTo(150, 10);
        ctx.lineTo(150, 20);
        ctx.stroke();
        // Cabeza
        if(cantErorres >1) {
            ctx.beginPath();
            ctx.arc(150, 40, 20, 0, Math.PI * 2);
            ctx.stroke();
        }
        // Torso
        if(cantErorres >2) {
            ctx.beginPath();
            ctx.moveTo(150, 60);
            ctx.lineTo(150, 100);
            ctx.stroke();
        }
        // Brazos 
        if(cantErorres >3){
            ctx.beginPath();
            ctx.moveTo(150, 60);
            ctx.lineTo(130, 100);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(150, 60);
            ctx.lineTo(170, 100);
            ctx.stroke();
        }
        // Piernas
        if(cantErorres > 4) {
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(170, 130);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(130, 130);
            ctx.stroke();

            Swal.fire({
                icon: 'error',
                title: 'Perdiste',
                text: 'La palabra era '+ valorAzar,
            })
            gameOver();
        }
    }
}



