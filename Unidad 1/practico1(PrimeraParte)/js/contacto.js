"use strict";
let btn_red = document.getElementById("red_hat"); //obtengo el elemento "boton red".
// tambien se puede hacer con querySelector("#red_hat") .
btn_red.addEventListener("click", sombreroRojo); //agregamos un evento al elemento botonRojo 
//(q obtuve en la linea 1) para que cuando hagan click en el elemento se ejecute la funcion mencionada.

// otra forma de lograr lo mismo : 
//document.querySelector("#red_hat").addEventListener("click", sombreroRojo);

document.getElementById("black_hat").addEventListener("click", sombreroNegro);



sombreroNegro()

function sombreroRojo(){
    
    document.getElementById("img_contacto").src = "images/4.jpeg"; // cambio de imagen
    
    document.getElementById("nombre").innerHTML = "Nombre: Ulises Palazzo"; // cambio de datos
    document.getElementById("nombre").classList.add("li_red");
    document.getElementById("alias").innerHTML = "Alias: Pala 83";
    document.getElementById("alias").classList.add("li_red");
    document.getElementById("email").innerHTML = "Email: hackerprofesional@deepweb.com";
    document.getElementById("email").classList.add("li_red");
    document.getElementById("tel").innerHTML = "Tel: Desconocido"; 
    document.getElementById("tel").classList.add("li_red");

    document.getElementById("contacto").classList.add("rojo");         // cambio de color de fondo
    document.getElementById("contacto").classList.remove("negro"); 
};


function sombreroNegro(){
    
    document.getElementById("img_contacto").src = "images/black_hat.jpeg";

    document.getElementById("nombre").innerHTML = "Nombre: Juan Ignacio Rago";
    document.getElementById("nombre").classList.remove("li_red");
    document.getElementById("alias").innerHTML = "Alias: Malinowski";
    document.getElementById("alias").classList.remove("li_red");
    document.getElementById("email").innerHTML = "Email: juanrago2015@gmail.com";
    document.getElementById("email").classList.remove("li_red");
    document.getElementById("tel").innerHTML = "Tel: 24345-8896667"; 
    document.getElementById("tel").classList.remove("li_red");

    document.getElementById("contacto").classList.add("negro"); 
    document.getElementById("contacto").classList.remove("rojo"); 
};
