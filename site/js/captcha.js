document.getElementById("generar-captcha").addEventListener("focus",generarCaptcha); //pongo a escuchar el evento para generar el captcha
let resultado;

function generarCaptcha(){
    let contenedor_captcha = document.getElementById("captcha");
    let primer_numero = generarNumero();
    let segundo_numero = generarNumero();
    contenedor_captcha.innerHTML = '<p>¿ Cuánto es <span id="primer-num">'+ primer_numero +'</span> + <span id="seg-num">'+ segundo_numero +'</span> ?</p><input id="valor-captcha" type="text"><div><button id="validar">validar</button></div>';
    generarEventoDeValidacion();
    contenedor_captcha.classList.add("captcha"); //agrego clase 

    resultado= primer_numero + segundo_numero; // guardo resultado valido del captcha
    console.log(resultado);
    console.log(typeof(resultado));
}

function generarNumero(){
    let numero_azar= Math.floor(Math.random()*10);
    return numero_azar;
}

function generarEventoDeValidacion(){
    document.getElementById("validar").addEventListener("click",validarCaptcha);
}

function validarCaptcha(){
    //console.log(resultado);
    //console.log(typeof(resultado));
    //alert(document.getElementById("valor-captcha").value)
    //alert(typeof(document.getElementById("valor-captcha").value))
    if(parseInt(document.getElementById("valor-captcha").value)==parseInt(resultado)){
        //contenedor.lassList.remove("captcha");
        let contenedor = document.getElementById("captcha");
        contenedor.innerHTML="";
        let mensaje = document.getElementById("info-resolucion");
        mensaje.innerHTML = "Validación satisfactoria";
        
    }
    else{
        //let mensaje = document.getElementById("info-resolucion");
        //mensaje.innerHTML = "La validación es incorrecta";
    }
}