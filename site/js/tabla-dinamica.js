document.addEventListener("DOMContentLoaded",actualizarCompraDePacks);

function actualizarCompraDePacks(){
    "use strict";
    
    const url = "https://62a95d68ec36bf40bdb68e4e.mockapi.io/api/pedidoss";
    let cantDeFilas = 0;
    
    let id_botones = ["btn1","btn2","btn3"]; //arreglo con ids de botones submit
    
    obtenerTabla();

    let form = document.querySelector("#form");
    form.addEventListener("submit",function(e){actualizarTabla(e);}); //pongo a escuchar el evento submit del formulario

    let reset = document.querySelector("#reset"); //boton reset
    reset.addEventListener("click", ()=>{  // pongo a escuchar el evento click del boton reset
        tabla_datos = [];   //vacio tabla
        obtenerTabla(); // mostrar tabla por web
    })

    //funcion que toma los datos cargados en el formulario los agrega al json y actualiza tabla para mostrar por web 
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
        

        let noEncontrado=true;
        let k=0; // indice que recorre el arreglo botones submits
        while(noEncontrado){
            if( id_botones[k] == e.submitter.id ){ 
                for (let w = 0; w <= k ; w++) {
                    fila_para_agregar.id = toString(cantDeFilas+1);
                    enviarFila(fila_para_agregar);
                    cantDeFilas++;
                }
                noEncontrado=false; // corta el while
            }
            k++; // sumo indice en 1
        }

        vaciarFormulario(); // resetea formulario
    }

    async function enviarFila(fila){
        try{
            let respuesta= await fetch(url, { "method":"POST", "headers": {"Content-type": "application/json"}, "body": JSON.stringify(fila) });
            console.log(respuesta.status);
            if(respuesta.status === 201){
                console.log(respuesta.status);
                obtenerTabla();
            } 
            else
                            console.log("no 202");
        }
        catch(errorConexion){console.log("error")};
    }

    async function obtenerTabla(){
        
        try{
            let respuesta= await fetch(url);
            if(respuesta.ok){                               
                            let tabla = await respuesta.json(); 
                            cantDeFilas= tabla.length;
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
            const tr = document.createElement("tr"); // creamos un elem tr (fila)
            for (const elem in fila) { // recorremos todos los elem de la fila (json)
                if(elem !== "id")
                    tr.innerHTML += `<td> ${fila[elem]} </td>`; // almacenamos todos los datos en el elem tr 
            }
            if(fila.pack=="Premium" && fila.tiempo=="1 Año") // preguntamos si culple la condicion
                tr.setAttribute("class","resaltado"); // agregamos atributo resaltado
            tabla_view.appendChild(tr); // agregamos fila al elem html (tabla)
        }
    }

    function vaciarFormulario(){
        form.reset();
    }
}