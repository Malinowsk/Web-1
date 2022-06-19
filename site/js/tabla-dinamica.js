document.addEventListener("DOMContentLoaded",actualizarCompraDePacks);

function actualizarCompraDePacks(){

    "use strict";
    
    const url = "https://62a95d68ec36bf40bdb68e4e.mockapi.io/api/pedidoss"; 
    
    obtenerTabla();
    
    let form = document.querySelector("#form"); //formulario
    form.addEventListener("submit",function(e){  //pongo a escuchar el evento submit del formulario
        actualizarTabla(e);
    });

    let reset = document.querySelector("#reset"); //boton reset
    reset.addEventListener("click", function(){  // pongo a escuchar el evento click del boton reset
        tabla_datos = [];   //vacio tabla
        obtenerTabla(); // mostrar tabla por web
    });
 
    function actualizarTabla(e){

        e.preventDefault(); // captura el evento del envio de formulario para que no se refresque la web

        let formData = new FormData(form); // se crea variable que contiene datos cargados en el formulario
        let fila_para_agregar = {}; // se crea fila json
        
        //se cargan los datos del formulario en la nueva fila 
        fila_para_agregar.usuario =formData.get("usuario"); 
        fila_para_agregar.email=formData.get("email");
        fila_para_agregar.telefono=formData.get("telefono");
        fila_para_agregar.tiempo=formData.get("tiempo");
        fila_para_agregar.pack=formData.get("pack");
        

        let id_botones = ["btn1","btn2","btn3"]; //arreglo con ids de botones submit
        let noEncontrado=true;
        let k=0; // indice que recorre el arreglo botones submits
        while(noEncontrado){
            if( id_botones[k] == e.submitter.id ){ 
                    enviarFila(fila_para_agregar,k+1);
                    noEncontrado=false;
            }
            k++; // sumo indice en 1
        }

      //  vaciarFormulario(); // resetea formulario
    }

    async function enviarFila(fila,cant){
        try{
            let respuesta= await fetch(url, {   "method":"POST", 
                                                "headers": {"Content-type": "application/json"}, 
                                                "body": JSON.stringify(fila) });

            if(respuesta.status === 201){
                if(cant==1)
                    obtenerTabla();
                else
                {
                    enviarFila(fila,cant-1);
                }
            } 
            else
                console.log("no 201");
        }
        catch(errorConexion){console.log("error")};
    }

    async function obtenerTabla(){
        
        try{
            let respuesta= await fetch(url);
            if(respuesta.ok){                               
                let tabla = await respuesta.json(); 
                mostrarTabla(tabla);} 
            else
                console.log("no 202")
        }
        catch(errorConexion){console.log(errorConexion)};
    }

    //funcion que muestra en web la tabla almacenada en variable
    function mostrarTabla(tabla_datos){
        let tabla_view = document.querySelector("#tabla-body"); //selecionamos el elem tabla body
        tabla_view.innerHTML = ""; // vaciamos el elemento 
        for (const fila of tabla_datos){    // recorremos todas las filas del arreglo (tabla)
            let id;
            const tr = document.createElement("tr"); // creamos un elem tr (fila)
            for (const elem in fila) { // recorremos todos los elem de la fila (json)
                if(elem !== "id")
                    tr.innerHTML += `<td>${fila[elem]}</td>`; // almacenamos todos los datos en el elem tr 
                else
                    id=fila[elem];
            }
            tr.innerHTML += `<td><button id="borrar-${id}">Borrar</button><button id="editar-${id}">Editar</button><button id="confirmar-${id}">Confirmar</button></td>`;
            if(fila.pack=="Premium" && fila.tiempo=="1 Año") // preguntamos si culple la condicion
                tr.setAttribute("class","resaltado"); // agregamos atributo resaltado
            tabla_view.appendChild(tr); // agregamos fila al elem html (tabla)
            document.querySelector(`#borrar-${id}`).addEventListener("click",function(){borrarFila(id)});
            
            document.querySelector(`#editar-${id}`).addEventListener("click",function(){editarFila(this)});
            document.querySelector(`#confirmar-${id}`).addEventListener("click",function(){confirmarFila(this,id)});
            document.querySelector(`#confirmar-${id}`).classList.add("invisibilidad");
        }
    }

    async function borrarFila(id){
        try{
            let respuesta= await fetch(`${url}/${id}`, { "method":"DELETE"});
            if(respuesta.status === 200){
                console.log(respuesta.status);
                obtenerTabla();
            } 
            else
                console.log("no 202");
        }
        catch(errorConexion){console.log("error")};
    }

    function editarFila(boton){
        let filaAEditar = boton.parentElement.parentElement;
        let arregloDeDatos = filaAEditar.children;
        for(let i = 0; i < arregloDeDatos.length-1; i++){
            let input = document.createElement("input");
            input.value=arregloDeDatos[i].innerHTML;
            arregloDeDatos[i].innerHTML="";
            arregloDeDatos[i].appendChild(input);
        }
        boton.classList.add("invisibilidad");
        boton.nextElementSibling.classList.remove("invisibilidad");
    }

    function confirmarFila(boton,id){
        let filaAEditar = boton.parentElement.parentElement;
        let arregloDeDatos = filaAEditar.children;
       
        let fila_modificada = {}; // se crea fila json

        
        fila_modificada.usuario =arregloDeDatos[0].firstElementChild.value; 
        fila_modificada.email=arregloDeDatos[1].firstElementChild.value;
        fila_modificada.telefono=arregloDeDatos[2].firstElementChild.value;
        fila_modificada.tiempo=arregloDeDatos[3].firstElementChild.value;
        fila_modificada.pack=arregloDeDatos[4].firstElementChild.value;

        guardarCambiosFila(fila_modificada, id);
        boton.innerHTML="Espere";
        
    }

    async function guardarCambiosFila(fila,id){
        try{
            let respuesta= await fetch(`${url}/${id}`, {   "method":"PUT", 
                                                "headers": {"Content-type": "application/json"}, 
                                                "body": JSON.stringify(fila) });

            if(respuesta.status === 200)
                obtenerTabla();
            else
                console.log("no 201");
        }
        catch(errorConexion){console.log("error")};
    }


    function vaciarFormulario(){
        form.reset();
    }
}