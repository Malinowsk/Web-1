"use strict"

let resultado; // variable para guardar el valor valido del captcha
generarCaptcha();
document.querySelector("#validar").addEventListener("click",validarCaptcha);//pongo a escuchar el evento para validar el captcha


//genera el captcha para validar que es un humano
function generarCaptcha(){
    let primer_numero = generarNumero(); // genero numero aleatorio
    let segundo_numero = generarNumero(); // genero numero aleatorio 
    document.querySelector("#prim_num").innerHTML = primer_numero; // agrego prim num en etiqueta span
    document.querySelector("#seg_num").innerHTML = segundo_numero; // agrego seg num en etiqueta span
    resultado= primer_numero + segundo_numero; // guardo resultado valido del captcha
}

function generarNumero(){
    return Math.floor(Math.random()*10); //devuelve un numero entero entre 0 y 9
}

//funcion para validar si el valor puesto para el captcha es el correcto o no
function validarCaptcha(){
    if(document.querySelector("#valor-captcha").value==resultado){
        let contenedor = document.querySelector("#captcha");
        contenedor.innerHTML="";
        contenedor.classList.remove("captcha");
        document.querySelector("#oculta").checked = true; // confirma que el captcha fue validado para poder enviar el formulario
        informarResultado(true);
    }
    else{
        informarResultado(false);
    }
}

//funcion que muestra por pantalla mensaje sobre la resolucion del captcha   
function informarResultado(valido){ 
    let parrafo = document.querySelector("#info-resolucion");
    if (valido){
        parrafo.classList.add("mensaje-valido");
        parrafo.classList.remove("mensaje-invalido");
        parrafo.innerHTML = "Validación satisfactoria!";
    }
    else
    {
        parrafo.classList.add("mensaje-invalido");
        parrafo.innerHTML = "La validación se efectuó incorrectamente!";
    }
}

