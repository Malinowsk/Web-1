document.addEventListener("DOMContentLoaded",actualizarTabla);


function actualizarTabla(){
    "use strict"

    let tabla_datos = [{"usuario":"Malinowsk","email":"malinowski@gmail.com","telefono": 2494542370,
                        "tiempo": "1 Mes", "pack":"Premium"},
                       {"usuario":"Ulises","email":"ulises@gmail.com","telefono": 2494542333,
                        "tiempo": "1 Año", "pack":"Normal"},
                       {"usuario":"Cracken","email":"ck@gmail.com","telefono": 2494543030,
                        "tiempo": "1 Mes", "pack":"Premium"}];
               
    mostrarTabla();

    let form =document.querySelector("#form");
    form.addEventListener("submit",function(e){capturarPedido(e,1);});
    document.querySelector("#btn2").addEventListener("click",function(e){capturarPedido(e,2)});
    document.querySelector("#btn3").addEventListener("click",function(e){capturarPedido(e,3)});


    function capturarPedido(e,cantidad){
        e.preventDefault();
        console.log(e);
        let formData = new FormData(form);
        let fila_para_agregar = {};

        fila_para_agregar.usuario =formData.get("usuario");
        fila_para_agregar.email=formData.get("email");
        fila_para_agregar.telefono=formData.get("telefono");
        fila_para_agregar.tiempo=formData.get("tiempo");
        fila_para_agregar.pack=formData.get("pack");
        
        for (let i =0;i<cantidad;i++){
            tabla_datos.push(fila_para_agregar);
        }

        mostrarTabla();
    }


    function mostrarTabla(){
        console.log(1);
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