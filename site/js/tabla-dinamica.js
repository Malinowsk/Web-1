document.addEventListener("DOMContentLoaded",actualizarTabla);


function actualizarTabla(){

let tabla_datos = [{"usuario":"Malinowsk","email":"malinowski@gmail.com","telefono": 2494542370,
                    "tiempo": "1 Mes", "pack":"Premium"},
                   {"usuario":"Malinowsk","email":"malinowski@gmail.com","telefono": 2494542370,
                    "tiempo": "1 Mes", "pack":"Premium"},
                   {"usuario":"Malinowsk","email":"malinowski@gmail.com","telefono": 2494542370,
                    "tiempo": "1 Mes", "pack":"Premium"}];

mostrarTabla();


function mostrarTabla(){
    tabla_view = document.querySelector("#tabla-body");
    tabla_view.innerHTML = "";
    for (const fila of tabla_datos) {
        tabla_view.innerHTML += `<tr>`;
        for (const elem of fila) {
            tabla_view.innerHTML += `<td>${elem}</td>`;
        }
        tabla_view.innerHTML+=`</tr>`;
    }
}



}


