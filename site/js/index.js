document.addEventListener("DOMContentLoaded",principal);

function principal(e){
    "use strict"
    
    push(e); // se carga el contenido de la pagina por primera vez
    despliegeMenu(); // agrega funcionalidad a los botones mobile del menu

    // funcionalidad de navegacion 
    window["inicio"].addEventListener("click",(event)=>{ push(event);});   
    window["servicios"].addEventListener("click",(event)=>{ push(event)});
    window["compras"].addEventListener("click",(event)=>{ push(event)});
    window["contacto"].addEventListener("click",(event)=>{ push(event);});
    
    // funcionalidad de retroceder y avanzar en el navegador 
    window.addEventListener("popstate", (event) => { 
        let id;
        if(event.state != null) // entra cuando vas a la direccion anterior o siguiente
            id = event.state.id;
        else{                    // entra cuando tocas los anchor de la tabla de indice en pag servicio
            let direccion = event.currentTarget.location.pathname; 
            id = direccion.slice(1,-5); // retorna el pathname sin la / y el .html
        } 
        seleccionarTab(id); //colorea boton de navegacion selecionado
        cargarContenido(id); 
    });
        

    // actualiza el contenido de la pagina correspondiente a la url actual
    function push(event){
        // seleccionar el id correspondiente
        let id;
        if(window.location.pathname == "/index.html" || window.location.pathname == "/"){ //window.location.pathname
            id="inicio";
        }
        else{
            if(event.target.id!==undefined)
                id = event.target.id;
            else
                id = window.location.pathname.slice(1,-5);
        }

        seleccionarTab(id); //colorea boton de navegacion selecionado
        
        document.title = "Bit Humanoide - " + capitalizarPrimeraLetra(id); // ponemos un titulo en la pestaña
        window.history.pushState({ id },`${id}`,`/${id}.html`); // cambia url
        cargarContenido(id); // carga contenido html con partial render
    }
    
    //colorea el boton de navegacion 
    function seleccionarTab(id){
        document.querySelectorAll(".navegacion").forEach((item)=> item.classList.remove("pag-actual")); 
        document.querySelector(`#${id}`).classList.add("pag-actual");
    }
    
    // carga el contenido de la pagina con partial render
    async function cargarContenido(id){
        let contenedor = document.querySelector("#main");
        try{
            let respuesta = await fetch(`${window.location.origin}/templates/${id}.html`);
            if(respuesta.ok){
                let contenido = await respuesta.text();
                contenedor.innerHTML = contenido;
                if(id==="contacto"){
                    iniciarCaptcha(); //damos funcionalidad al captcha en el caso que estemos en la pag contacto
                }
                if(id==="compras"){
                    actualizarCompraDePacks(); //damos funcionalidad al tabla dinamica en el caso que estemos en la pag compras
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

    // pasa a mayuscula la primera letra del string pasado como parametro
    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    ///////////////////////////////TERMINA PARTIAL RENDER - COMIENZA DESPLIEGE MENU///////////////////////////////////////

    function despliegeMenu(){
    
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

    ///////////////////////////////TERMINA DESPLIEGE MENU - COMIENZA FUNCIONALIDAD PARA LA TABLA DINAMICA///////////////////////////////////////

    // funcion utilizada para compras.html
    function actualizarCompraDePacks(){
        
        const url_base = "https://62a95d68ec36bf40bdb68e4e.mockapi.io/api/pedidoss"; // url base
       
        let url_actual=[url_base,"?","p=",1,"&l=10"] // arreglo que concatena la url_base , filtro y paginado  
        
        obtenerTabla(); // carga dinamicamente y muestra tabla al iniciar pagina de compras.html
       
        // declaracion de la funcionalidad de los botones de la tabla

        let form = document.querySelector("#form"); //formulario
        form.addEventListener("submit",function(e){  //pongo a escuchar el evento submit del formulario
            actualizarTabla(e); // agrego nueva fila a la tabla dinamica
        });
        
        let atras = document.querySelector("#atras"); // capturo el boton que pide la anterior pagina
        atras.addEventListener("click", function(){
            if (url_actual[3] !== 1){                // chekea que la pagina actual no sea la 1
                url_actual[3]--;                    // descuento numero de pagina
                obtenerTabla();
            }
        });

        let siguiente = document.querySelector("#siguiente"); // capturo el boton que pide la siguiente pag
        siguiente.addEventListener("click", function(){ 
            url_actual[3]++;                                // aumento numero de pagina
            obtenerTabla();
        });

        let form_filtro = document.querySelector("#filtrado"); // capturo el boton que pide el filtrado
        form_filtro.addEventListener("submit", function(e){
            e.preventDefault();
            let filtro = getFilter();                          // devuelve filtro (EJEMPLO= ?pack=Premium& )
            url_actual[1] = filtro;
            obtenerTabla();
        });

        let reset = document.querySelector("#reset"); //boton reset
        reset.addEventListener("click", function(){  // pongo a escuchar el evento click del boton reset
            this.innerHTML="Espere";                 
            let tabla = document.querySelector("#tabla-body");
            tabla.innerHTML=" Borrando, espere unos segundos... ";
            borrarTablaCompleta(); // borro todos los datos de la tabla dinamica
        });

        function getFilter(){                          // retorna filtro a buscar en mockapi
            let form = new FormData(form_filtro);
            if(form.get("valor-filtro")=="")
                return "?";
            else
                return "?" + form.get("filtro").toLowerCase() + "=" + form.get("valor-filtro") + "&";
        }
         
        function obtenerUrl(arr_url){    // devuelve url completa para usarse en el fetch
            let retorno = "";
            for(let parte of arr_url){
                retorno+= parte;
            }
            return retorno;
        }

        function vaciarFormulario(){      // vacia formulario luego de enviado
            form.reset();
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
    
        // carga la cantidad cant de elementos a mokapi
        async function enviarFila(fila,cant){
            try{
                let respuesta= await fetch(url_base, {"method":"POST", 
                                                      "headers": {"Content-type": "application/json"}, 
                                                      "body": JSON.stringify(fila) });
                if(respuesta.status === 201){
                    if(cant==1)
                        obtenerTabla();
                    else{
                        enviarFila(fila,cant-1);     // llama a la funcion con cant-1
                    }
                } 
                else
                    console.log(`La peticion POST no fue exitosa error: ${respuesta.status}`);
            }
            catch(error){console.log("error de conexión")};
        }

        // obtener tabla de la url actual a pedir , con paginado y filtro en caso que asi sea
        async function obtenerTabla(){
            try{
                let respuesta= await fetch( obtenerUrl(url_actual) ); /// se hace fetch a la url a buscar actual 
                if(respuesta.ok){                               
                    let tabla = await respuesta.json();                // me devuelve una tabla a mostrar, ya sea con paginado y filtro en caso de que asi sea
                    if( (tabla.length==0) && (url_actual[3]>1) ){ // si la tabla devuelta es vacia y la pagina pedida no es 1
                        url_actual[3]--;                         // busco una pagina menos
                        obtenerTabla();                          // funcion recursiva
                    }
                    else{
                        mostrarTabla(tabla);                     // visualizacion de la tabla obtenida
                    }
                } 
                else
                    console.log(`La url: "${respuesta.url}" esta mal especificada`);
            }
            catch(error){console.log("error de conexión")};
        }
    
        //funcion que muestra en web la tabla almacenada en variable tabla datos
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
    
            }
            document.querySelector("#prim-fila").innerHTML= `${((url_actual[3]-1)*10) + 1}`;
            document.querySelector("#ult-fila").innerHTML = `${((url_actual[3]-1)*10) + tabla_datos.length}`;
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
    
    
        async function borrarTablaCompleta(){
            try{
                let respuesta= await fetch(url_base); // devuelve 
                if(respuesta.ok){                               
                    let tabla = await respuesta.json();
                    borrarTodasLasFilas(tabla);
                } 
                else{
                    console.log(`La url: "${respuesta.url}" esta mal especificada`);
                    reset.innerHTML="Resetear";
                }
            }
            catch(error){
                    console.log("error de conexión");
                    reset.innerHTML="Resetear";
            }
        }

        async function borrarTodasLasFilas(tabla){
            try{
                let respuesta= await fetch(`${url_base}/${tabla[tabla.length-1].id}`, { "method":"DELETE"});
                if(respuesta.status === 200){
                    if(tabla.length===1){
                        obtenerTabla();
                        document.querySelector("#prim-fila").innerHTML= 0;
                        document.querySelector("#ult-fila").innerHTML = 0;
                        reset.innerHTML="Resetear";
                    }
                    else{
                        tabla.pop();
                        borrarTodasLasFilas(tabla);
                    }
                } 
                else{
                    console.log(`La peticion DELETE fallo, error: ${respuesta.status}`);
                    reset.innerHTML="Resetear";
                };
            }
            catch(error){
                console.log("error de conexión"+ tabla[tabla.length-1]);
                reset.innerHTML="Resetear";
            };
        }

    }

///////////////////////////////TERMINA FUNCIONALIDAD PARA LA TABLA DINAMICA - COMIENZA FUNCIONALIDAD PARA EL CAPTCHA///////////////////////////////////////


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
