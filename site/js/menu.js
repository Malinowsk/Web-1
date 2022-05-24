document.addEventListener("DOMContentLoaded",iniciarCaptcha);


function iniciarCaptcha(){

    "use strict"

    const INVISIBILIDAD = "invisibilidad"; //nombre de la clase que contiene display none

    document.querySelector("#btn-menu").addEventListener("click",function(e){mostrarOcultarMenuSesion("#menu","#header-superior")}); //pongo a escuchar el evento click para mostrar y ocultar la barra de navegacion
    document.querySelector("#btn-sesion").addEventListener("click",function(e){mostrarOcultarMenuSesion("#header-superior","#menu")}); //pongo a escuchar el evento click para mostrar y ocultar el inicio de sesion

    //funcion que hace toggle de la clase invisibilidad al elemento mostrar (dado como paramentro) y asegura que tenga la clase invi el elem ocultar(dado como paramentro)
    function mostrarOcultarMenuSesion(mostrar,ocultar){
        let elem_cambiar = document.querySelector(mostrar); // capturo el elem a cambiar
        let elem_ocultar = document.querySelector(ocultar); // capturo el elem a ocultar
        if (elem_cambiar.classList.contains(INVISIBILIDAD) && !elem_ocultar.classList.contains(INVISIBILIDAD)) // pregunto si el cambio es para mostrar y aseguro que este oculto el otro elemento
            elem_ocultar.classList.add(INVISIBILIDAD); // lo oculto
        elem_cambiar.classList.toggle(INVISIBILIDAD); // lo cambio
    }

}