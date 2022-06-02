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

    mostrarTabla(); // se cargan datos en la tabla para mostrar por web 

    let form =document.querySelector("#form"); // se toma el elemento formulario

    form.addEventListener("submit",function(e){actualizarTabla(e,1);}); // se captura el evento de hacer click en el boton submit
    document.querySelector("#btn2").addEventListener("click",function(e){actualizarTabla(e,2)});
    document.querySelector("#btn3").addEventListener("click",function(e){actualizarTabla(e,3)});

    //funcion que toma los datos cargados en el formulario los agrega al json y actualiza tabla para mostrar por web 
    function actualizarTabla(e,cantidad){
        e.preventDefault(); // captura el evento del envio de formulario para que no se refresque la web

        let formData = new FormData(form); // se crea variable que contiene datos cargados en el formulario
        
        let fila_para_agregar = {}; // se crea fila json

        //se cargan los datos del formulario en la nueva fila 
        fila_para_agregar.usuario =formData.get("usuario"); 
        fila_para_agregar.email=formData.get("email");
        fila_para_agregar.telefono=formData.get("telefono");
        fila_para_agregar.tiempo=formData.get("tiempo");
        fila_para_agregar.pack=formData.get("pack");
        
        //agrega fila al arreglo de filas (tabla de datos)
        for (let i =0;i<cantidad;i++){
            tabla_datos.push(fila_para_agregar);
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












































    //function mostrarTabla(){
    //    tabla_view = document.querySelector("#tabla-body");
    //    tabla_view.innerHTML = "";
    //    console.table(tabla_datos);
    //    for (const fila of tabla_datos) {
    //        tabla_view.innerHTML += `<tr><td>${fila.usuario}</td><td>${fila.email}</td><td>${fila.telefono}</td><td>${fila.tiempo}</td><td>${fila.pack}</td></tr>`;
    //    }
    //}