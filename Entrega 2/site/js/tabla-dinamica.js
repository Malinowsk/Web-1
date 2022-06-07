document.addEventListener("DOMContentLoaded",actualizarCompraDePacks);

function actualizarCompraDePacks(){
    "use strict"

    let tabla_datos = [{"usuario":"Malinowsk","email":"malinowski@gmail.com","telefono": 2494542370,
                        "tiempo": "1 Año", "pack":"Premium"}, //fila 1
                       {"usuario":"Ulises","email":"ulises@gmail.com","telefono": 2494542333,
                        "tiempo": "1 Mes", "pack":"Normal"}, //fila 2
                       {"usuario":"Cracken","email":"ck@gmail.com","telefono": 2494543030,
                       "tiempo": "1 Año", "pack":"Premium"}, //fila 3
                       {"usuario":"Samuel","email":"samuel80@gmail.com","telefono": 2494545099,
                        "tiempo": "1 Año", "pack":"Bit Humanoide"}, //fila 4
                       {"usuario":"Guillermo","email":"guille@gmail.com","telefono": 2494344579,
                        "tiempo": "1 Mes", "pack":"Bit Humanoide"},  //fila 5
                        {"usuario":"Arthas","email":"Arthas@gmail.com","telefono": 2391344579,
                        "tiempo": "1 Año", "pack":"Premium"}]; //fila 6      
               
    let id_botones = ["btn1","btn2","btn3"]; //arreglo con ids de botones submit

    mostrarTabla(); // mostrar por web, filas precargadas

    let form = document.querySelector("#form");
    form.addEventListener("submit",function(e){actualizarTabla(e);}); //pongo a escuchar el evento submit del formulario
    
    let reset = document.querySelector("#reset"); //boton reset
    reset.addEventListener("click", ()=>{  // pongo a escuchar el evento click del boton reset
        tabla_datos = [];   //vacio tabla
        mostrarTabla(); // mostrar tabla por web
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
                    tabla_datos.push(fila_para_agregar);
                }
                noEncontrado=false; // corta el while
            }
            k++; // sumo indice en 1
        }

        mostrarTabla(); // se muestra por pantalla la tabla de datos
        vaciarFormulario(); // resetea formulario
    }

    //funcion que muestra en web la tabla almacenada en variable
    function mostrarTabla(){
        let tabla_view = document.querySelector("#tabla-body"); //selecionamos el elem tabla body
        tabla_view.innerHTML = ""; // vaciamos el elemento 
        for (const fila of tabla_datos){    // recorremos todas las filas del arreglo (tabla)
            const tr = document.createElement("tr"); // creamos un elem tr (fila)
            for (const elem in fila) { // recorremos todos los elem de la fila (json)
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