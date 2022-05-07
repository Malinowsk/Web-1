//genera el captcha para validar que es un humano
function generarCaptcha(){
    let primer_numero = generarNumero(); // genero numero aleatorio
    let segundo_numero = generarNumero(); // genero numero aleatorio 
    document.querySelector("#prim_num").innerHTML = primer_numero; // agrego prim num en etiqueta span
    document.querySelector("#seg_num").innerHTML = segundo_numero; // agrego seg num en etiqueta span
    let contenedor_captcha = document.querySelector("#captcha"); // selecciono el div 
    contenedor_captcha.classList.toggle("oculto"); // le agrego o saco al div la clase para que aparesca o desaparesca
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
        document.querySelector("#generar-captcha").removeEventListener("click",generarCaptcha); // borramos el evento de hacer click en el boton de generar captcha
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

document.querySelector("#generar-captcha").addEventListener("click",generarCaptcha); //pongo a escuchar el evento para generar el captcha
document.querySelector("#validar").addEventListener("click",validarCaptcha);//pongo a escuchar el evento para validar el captcha
let resultado; // variable para guardar el valor valido del captcha