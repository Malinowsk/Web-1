//genera el captcha para validar que es un humano
function generarCaptcha(){
    let primer_numero = generarNumero(); // genero numero aleatorio
    let segundo_numero = generarNumero(); // genero numero aleatorio
    let contenedor_captcha = document.querySelector("#captcha"); // selecciono el div 
    contenedor_captcha.innerHTML = '<p>¿ Cuánto es '+ primer_numero +' + '+ segundo_numero +' ?</p><input id="valor-captcha" type="text"><div><button id="validar" type="button">validar</button></div>';
    contenedor_captcha.classList.add("captcha"); //agrego clase 
    generarEventoDeValidacion(); //funcion que pone a escuchar un evento para validar con  el captcha
    resultado= primer_numero + segundo_numero; // guardo resultado valido del captcha
}

function generarNumero(){
    return Math.floor(Math.random()*10); //devuelve un numero entero entre 0 y 9
}

function generarEventoDeValidacion(){
    document.querySelector("#validar").addEventListener("click",validarCaptcha); //pongo a escuchar el evento para validar el captcha
}


//funcion para validar si el valor puesto para el captcha es el correcto o no
function validarCaptcha(){
    if(document.querySelector("#valor-captcha").value==resultado){
        let contenedor = document.querySelector("#captcha");
        contenedor.innerHTML="";
        contenedor.classList.remove("captcha");
        informarResultado("Validación satisfactoria! ");
    }
    else{
        informarResultado("La validación se efectuó incorrectamente!");
    }
}

//funcion que muestra por pantalla mensaje sobre la resolucion del captcha   
function informarResultado(mensaje){ 
    let parrafo = document.querySelector("#info-resolucion");
        parrafo.classList.add("mensaje-validado");
        parrafo.innerHTML = mensaje;
}

document.querySelector("#generar-captcha").addEventListener("focus",generarCaptcha); //pongo a escuchar el evento para generar el captcha
let resultado; // variable para guardar el valor valido del captcha