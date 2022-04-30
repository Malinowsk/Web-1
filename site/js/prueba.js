
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


//Una consulta, nosotros queremos que cuando el usuario toque un botón le aparezca una sección chiquita de la página (que en principio no esta), para lograrlo con lo que sabemos hasta ahora, lo hicimos agregamos html al js, para este caso puntual podemos dejarlo de esa manera o nos podes recomendar buscar alguna forma mas elegante?

//Una consulta, nosotros queremos que cuando el usuario toque un botón le aparezca una sección chiquita de la página 
//(que en principio no esta), para lograrlo con lo que sabemos hasta ahora, lo hicimos agregamos html al js, para este 
//caso puntual podemos dejarlo de esa manera o nos podes recomendar buscar alguna forma mas elegante?
