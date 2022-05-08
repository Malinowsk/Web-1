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
        informarResultado("Validación satisfactoria! ");
    }
    else{
        informarResultado("La validación se efectuó incorrectamente!");
    }
}

//funcion que muestra por pantalla mensaje sobre la resolucion del captcha   
function informarResultado(mensaje){ 
    let parrafo = document.querySelector("#info-resolucion");
        parrafo.innerHTML = mensaje;
}

let resultado; // variable para guardar el valor valido del captcha
generarCaptcha();
document.querySelector("#validar").addEventListener("click",validarCaptcha);//pongo a escuchar el evento para validar el captcha