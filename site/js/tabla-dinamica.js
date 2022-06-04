document.addEventListener("DOMContentLoaded",actualizarCompraDePacks);

function actualizarCompraDePacks(){
    "use strict"

    let tabla_datos = [{"usuario":"Malinowsk","email":"malinowski@gmail.com","telefono": 2494542370,
                        "tiempo": "1 Mes", "pack":"Premium"}, //fila 1
                       {"usuario":"Ulises","email":"ulises@gmail.com","telefono": 2494542333,
                        "tiempo": "1 Año", "pack":"Normal"}, //fila 2
                       {"usuario":"Cracken","email":"ck@gmail.com","telefono": 2494543030,
                       "tiempo": "1 Año", "pack":"Premium"}, //fila 3
                       {"usuario":"Samuel","email":"samuel80@gmail.com","telefono": 2494545099,
                        "tiempo": "1 Año", "pack":"Bit Humanoide"}, //fila 4
                       {"usuario":"Guillermo","email":"guille@gmail.com","telefono": 2494344579,
                        "tiempo": "1 Mes", "pack":"Bit Humanoide"}];//fila 5      
               
    let id_botones = ["btn1","btn2","btn3"];

    mostrarTabla();

    let form = document.querySelector("#form");
    form.addEventListener("submit",function(e){actualizarTabla(e);});
    
    let reset = document.querySelector("#reset");
    reset.addEventListener("click", ()=>{
        tabla_datos = [];
        mostrarTabla();
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
        let k=0;
        while(noEncontrado){
            if( id_botones[k] == e.submitter.id ){
                for (let w = 0; w <= k ; w++) {
                    tabla_datos.push(fila_para_agregar);
                }
                noEncontrado=false;
            }
            k++;
        }

        mostrarTabla(); // se muestra por pantalla la tabla de datos
    }


    function mostrarTabla(){
        let tabla_view = document.querySelector("#tabla-body");
        tabla_view.innerHTML = "";
        for (const fila of tabla_datos){
            const tr = document.createElement("tr");
            for (const elem in fila) {
                tr.innerHTML += `<td> ${fila[elem]} </td>`;
            }
            if(fila.pack=="Premium")
                tr.setAttribute("class","resaltado");
            tabla_view.appendChild(tr);
        }
    }
}