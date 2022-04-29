
let contador = 0;

function crearCaptcha(){
    let aux = document.getElementById("captcha");
    console.log(aux);
    contador++;
    aux.classList
    aux.innerHTML = "aca va el captche, contador" + contador + "es el resultado";
    console.log(aux.innerHTML);
}

document.getElementById("boton-rojo").addEventListener("click",mostrarBotonClickeadoRojo);
document.getElementById("boton-azul").addEventListener("click",mostrarBotonClickeadoAzul);
document.getElementById("boton-verde").addEventListener("click",mostrarBotonClickeadoVerde);

function mostrarBotonClickeadoRojo(){
    let parrafo = document.getElementById("ultimo-clickeado");
    parrafo.innerHTML="El último boton que se clickeo es el rojo";
}

function mostrarBotonClickeadoAzul(){
    let parrafo = document.getElementById("ultimo-clickeado");
    parrafo.innerHTML="El último boton que se clickeo es el azul";
}

function mostrarBotonClickeadoVerde(){
    let parrafo = document.getElementById("ultimo-clickeado");
    parrafo.innerHTML="El último boton que se clickeo es el verde";
}



