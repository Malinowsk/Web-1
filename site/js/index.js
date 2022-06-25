document.addEventListener("DOMContentLoaded",partialRender);

function partialRender(){
    "use strict"
    
    window["inicio"].addEventListener("click",(event)=>{ push(event);});
    window["servicios"].addEventListener("click",(event)=>{ push(event)});
    window["compras"].addEventListener("click",(event)=>{ push(event)});
    window["contacto"].addEventListener("click",(event)=>{ push(event);});
    
    window.addEventListener("popstate", event => { 
        // Tome la identificación del estado del historial
        let id = event.state.id; 
        seleccionarTab(id); 
        cargarContenido(id);
    });

    cargarInicio();
    
    function cargarInicio(){
        let id = "inicio";
        seleccionarTab(id); //colorea boton de navegacion selecionado
        
        document.title = "Bit Humanoide - " + capitalizarPrimeraLetra(id);
        cargarContenido(id);
        window.history.pushState({ id },`${id}`,`/${id}`);
    }

    function push(event){
        let id = event.target.id;
        seleccionarTab(id); //colorea boton de navegacion selecionado
        
        document.title = "Bit Humanoide - " + capitalizarPrimeraLetra(id);
        cargarContenido(id);
        window.history.pushState({ id },`${id}`,`/${id}`);

    }
    
    function seleccionarTab(id){
        document.querySelectorAll(".navegacion").forEach((item)=> item.classList.remove("pag-actual")); 
        document.querySelector(`#${id}`).classList.add("pag-actual");
    }
    
    async function cargarContenido(id){
        let contenedor = document.querySelector("#main");
        try{
            let respuesta = await fetch(`${window.location.origin}/${id}.html`);
            if(respuesta.ok){
                let contenido = await respuesta.text();
                contenedor.innerHTML = contenido;
                if(id==="contacto"){
                    iniciarCaptcha();
                }
                if(id==="compras"){
                    actualizarCompraDePacks();
                }
            }
            else{
                contenedor.innerHTML = `<h1>Error</h1>
                                        <p>El error es: ${respuesta.status} - ${respuesta.statusText}</p>
                                        <p>La url: "${respuesta.url}" esta mal especificada</p>
                                        <ul>Solucion: cambiar la carpeta raiz del servidor local
                                            <li> - Mal: ~/site/inicio.html</li>
                                            <li> + Bien: ~/inicio.html</li>
                                        </ul>`;
            }
        }
        catch(error){
            contenedor.innerHTML = "error de conexión";
        }
    }
    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    // funcion utilizada para compras.html
    function actualizarCompraDePacks(){
        
        const url_base = "https://62a95d68ec36bf40bdb68e4e.mockapi.io/api/pedidoss";
        //let pag_actual = 1;
        //let url_actual=`${url_base}?p=${pag_actual}&l=10`; //https://62a95d68ec36bf40bdb68e4e.mockapi.io/api/pedidoss?p=1&l=10
        let url_actual=[url_base,"?","p=",1,"&l=10"]
        
        obtenerTabla();
       
        let form = document.querySelector("#form"); //formulario
        form.addEventListener("submit",function(e){  //pongo a escuchar el evento submit del formulario
            actualizarTabla(e);
        });
    
        //let reset = document.querySelector("#reset"); //boton reset
        //reset.addEventListener("click", function(){  // pongo a escuchar el evento click del boton reset
        //    tabla_datos = [];   //vacio tabla
        //    obtenerTabla(pag_actual); // mostrar tabla por web
        //});

        let atras = document.querySelector("#atras");
        atras.addEventListener("click", function(){
            if (url_actual[3] !== 1){
                url_actual[3]--;
                obtenerTabla();
            }
        });

        let siguiente = document.querySelector("#siguiente");
        siguiente.addEventListener("click", function(){ 
            url_actual[3]++;
            obtenerTabla();
        });

        let form_filtro = document.querySelector("#filtrado");
        form_filtro.addEventListener("submit", function(e){
            e.preventDefault();
            let filtro = getFilter();
            url_actual[1] = filtro;
            obtenerTabla();
        });

        function getFilter(){
            let form = new FormData(form_filtro);
            if(form.get("valor-filtro")=="")
                return "?";
            else
                return "?" + form.get("filtro").toLowerCase() + "=" + form.get("valor-filtro") + "&";
        }


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
    
            vaciarFormulario(); // resetea formulario
        }
    
        async function enviarFila(fila,cant){
            try{
                let respuesta= await fetch(url_base, {"method":"POST", 
                                                      "headers": {"Content-type": "application/json"}, 
                                                      "body": JSON.stringify(fila) });
                if(respuesta.status === 201){
                    if(cant==1)
                        obtenerTabla();
                    else{
                        enviarFila(fila,cant-1);
                    }
                } 
                else
                    console.log(`La peticion POST no fue exitosa error: ${respuesta.status}`);
            }
            catch(error){console.log("error de conexión")};
        }

        function obtenerUrl(arr_url){
            let retorno = "";
            for(let parte of arr_url){
                retorno+= parte;
            }
            return retorno;
        }

    
        async function obtenerTabla(){
            try{
                let respuesta= await fetch( obtenerUrl(url_actual) ); ///?p=1&l=10
                if(respuesta.ok){                               
                    let tabla = await respuesta.json();
                    if( (tabla.length==0) && (url_actual[3]>1) ){
                        url_actual[3]--;
                        obtenerTabla();
                    }
                    else{
                        mostrarTabla(tabla);
                    }
                } 
                else
                    console.log(`La url: "${respuesta.url}" esta mal especificada`);
            }
            catch(error){console.log("error de conexión")};
        }
    
        //funcion que muestra en web la tabla almacenada en variable
        function mostrarTabla(tabla_datos){
            let tabla_view = document.querySelector("#tabla-body"); //selecionamos el elem tabla body
            tabla_view.innerHTML = ""; // vaciamos el elemento 
            for (const fila of tabla_datos){    // recorremos todas las filas del arreglo (tabla)
                let id;
                const tr = document.createElement("tr"); // creamos un elem tr (fila)/blogs?page=1&limit=10
                for (const elem in fila) { // recorremos todos los elem de la fila (json)
                    if(elem !== "id")
                        tr.innerHTML += `<td>${fila[elem]}</td>`; // almacenamos todos los datos en el elem tr 
                    else
                        id=fila[elem];
                }
                tr.innerHTML += `<td>
                                     <button id="borrar-${id}"><i class="fa fa-trash-alt"></i></button>
                                     <button id="editar-${id}"><i class="fa fa-pencil-alt"></i></button>
                                     <button id="confirmar-${id}"><i class="fa fa-check"></i></button>
                                </td>`;
                if(fila.pack=="Premium" && fila.tiempo=="1 Año") // preguntamos si culple la condicion
                    tr.setAttribute("class","resaltado"); // agregamos atributo resaltado
                tabla_view.appendChild(tr); // agregamos fila al elem html (tabla)
                document.querySelector(`#borrar-${id}`).addEventListener("click",function(){borrarFila(id)});
                
                document.querySelector(`#editar-${id}`).addEventListener("click",function(){editarFila(this)});
                document.querySelector(`#confirmar-${id}`).addEventListener("click",function(){confirmarFila(this,id)});
                document.querySelector(`#confirmar-${id}`).classList.add("invisibilidad");

                document.querySelector("#prim-fila").innerHTML= `${((url_actual[3]-1)*10) + 1}`;
                document.querySelector("#ult-fila").innerHTML = `${((url_actual[3]-1)*10) + tabla_datos.length}`;

            }
        }
    
        async function borrarFila(id){
            try{
                let respuesta= await fetch(`${url_base}/${id}`, { "method":"DELETE"});
                if(respuesta.status === 200){
                    obtenerTabla();
                } 
                else
                    console.log(`La peticion DELETE fallo, error: ${respuesta.status}`);
            }
            catch(error){console.log("error de conexión")};
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
                let respuesta= await fetch(`${url_base}/${id}`, {"method":"PUT", 
                                                                 "headers": {"Content-type": "application/json"}, 
                                                                 "body": JSON.stringify(fila) });
    
                if(respuesta.status === 200)
                    obtenerTabla();
                else
                    console.log(`La peticion PUT no fue exitosa error: ${respuesta.status}`);
            }
            catch(error){console.log("error de conexión")};
        }
    
    
        function vaciarFormulario(){
            form.reset();
        }
    }

    function iniciarCaptcha(){

        let resultado; // variable para guardar el valor valido del captcha
        generarCaptcha();
        document.querySelector("#validar").addEventListener("click",validarCaptcha);//pongo a escuchar el evento para validar el captcha
        
        
        //genera el captcha para validar que es un humano
        function generarCaptcha(){
        let primer_numero = generarNumero(); // genero numero aleatorio
        let segundo_numero = generarNumero(); // genero numero aleatorio 
        document.querySelector("#prim_num").innerHTML = primer_numero; // agrego prim num en etiqueta span
        document.querySelector("#seg_num").innerHTML = segundo_numero; // agrego seg num en etiqueta span
        resultado= primer_numero + segundo_numero; // guardo resultado valido del captcha
        }
        
        function generarNumero(){
        return Math.floor(Math.random()*10); //devuelve un numero entero entre 0 y 9
        }
        
        //funcion para validar si el valor puesto para el captcha es el correcto o no
        function validarCaptcha(){
        if(document.querySelector("#valor-captcha").value==resultado){
            let contenedor = document.querySelector("#captcha");
            contenedor.innerHTML="";
            contenedor.classList.remove("captcha");
            document.querySelector("#oculta").checked = true; // confirma que el captcha fue validado para poder enviar el formulario
            informarResultado(true);
        }
        else{
            informarResultado(false);
        }
        }
        
        //funcion que muestra por pantalla mensaje sobre la resolucion del captcha   
        function informarResultado(valido){ 
        let parrafo = document.querySelector("#info-resolucion");
        if (valido){
            parrafo.classList.add("mensaje-valido");
            parrafo.classList.remove("mensaje-invalido");
            parrafo.innerHTML = "Validación satisfactoria!";
        }
        else
        {
            parrafo.classList.add("mensaje-invalido");
            parrafo.innerHTML = "La validación se efectuó incorrectamente!";
        }
        }
    }
    

}