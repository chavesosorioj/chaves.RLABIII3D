import AnuncioAnimales from "./anuncio.js";

let idSeleccionado= "";

const listaAnuncios = JSON.parse(localStorage.getItem("animales")) || [];

console.log(listaAnuncios);

window.addEventListener("DOMContentLoaded",()=>{


    document.forms[0].addEventListener("submit", handlerAgregar);
    document.addEventListener("click",handlerClick);    

    if(listaAnuncios.length >0){
        handlerCargarLista(listaAnuncios);
        console.log("if lista anuncio");
    }
});

function handlerCargarLista(e){
    renderizarLista(crearTabla(listaAnuncios), document.getElementById("divTablaAnuncios"));
}

function renderizarLista(lista, contenedor){

    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild);
    }

    if(lista){
       contenedor.appendChild(lista); 
    }
}

function crearTabla(item){

    const tabla = document.createElement("table");
    tabla.appendChild(crearThead(item[0]));
    tabla.appendChild(crearTBody(item));

    return tabla;
}

function crearThead(item){
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");


    for(const key in item){
        if (key !== "id"){
        const th = document.createElement("th");
        th.textContent = key;
        tr.appendChild(th);  
        }    
    }
    thead.appendChild(tr);
    return thead;
}

function crearTBody(items){
    const tbody = document.createElement("tbody");
    items.forEach(item=>{
        const tr = document.createElement("tr");
        
        for(const key in item){
            if (key == "id"){
                tr.setAttribute("data-id",item[key]);
            }else{
                const td = document.createElement("td");
                td.textContent = item[key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    return tbody;
}
function generarId(){
    return listaAnuncios.length +1;
}
function handlerAgregar(e){
    e.preventDefault();
    const form = e.target; 
    if(document.getElementById("btnGuardar").value =="Guardar"){
        const nuevoAnuncio = new AnuncioAnimales(
            generarId(),
            form.titulo.value,
            form.descripcion.value,
            form.animal.value,
            form.precio.value,
            form.raza.value,
            form.fecha.value,
            form.vacuna.value,
            form.edad.value
        )
            
            getSpinner()
            setTimeout(()=>{
                altaAnuncio(nuevoAnuncio);
                limpiarSpinner();
            },2000);

    } 
}

function handlerClick(e){
    if(e.target.matches("td")){
        idSeleccionado = e.target.parentNode.dataset.id;
        console.log("id seleccionado: "+idSeleccionado);

    }else if(e.target.matches("#btnEliminar")){
        if(confirm("desea eliminar el id "+idSeleccionado+"?")){
            getSpinner();

            setTimeout(()=>{
                let auxId = listaAnuncios.findIndex(element=> element.id==idSeleccionado);
                //console.log(auxId);
                listaAnuncios.splice(auxId,1);
                almacenarDatos(listaAnuncios); 
              
                limpiarSpinner()
            },1000);

        }
    }else if(e.target.matches("#btnModificar")){
        if(confirm("desea modificar el id "+idSeleccionado+"?")){
            const nuevoAnuncio = new AnuncioAnimales(
                generarId(),
                document.getElementById("titulo-form").value,
                document.getElementById("descripcion-form").value,
                opcionAnimales(),
                document.getElementById("precio-form").value,
                document.getElementById("raza-form").value,
                document.getElementById("fecha-form").value,
                document.getElementById("vacuna-form").value,
                opcionEdad()
            )
            let auxId = listaAnuncios.findIndex(element=> element.id==idSeleccionado);
                console.log(auxId);
                listaAnuncios.splice(auxId,1);
                listaAnuncios.push(nuevoAnuncio);
                almacenarDatos(listaAnuncios);
        }
    }
}

const getSpinner = ()=>{
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./imagenes/loading-barra.gif");
    spinner.setAttribute("alt","spinner");
    document.getElementById("divSpinner").appendChild(spinner);
}

function limpiarSpinner(){
    document.getElementById("divSpinner").innerHTML="";
}

function altaAnuncio(a){
    listaAnuncios.push(a);
    almacenarDatos(listaAnuncios);
}


function almacenarDatos(data){
    localStorage.setItem("animales",JSON.stringify(data));
    handlerCargarLista();
}
function cargarFormulario(id){

    let anuncio = null;
    const form = document.forms[0];

    anuncio = listaAnuncios.filter(p => p.id == id)[0];

    form.id.value = anuncio.id;
    form.titulo.value = anuncio.titulo;
    form.descripcion.value = anuncio.descripcion;
    form.animal.value = anuncio.animal;
    form.precio.value = anuncio.precio;
    form.raza.value = anuncio.raza;
    form.fecha.value = anuncio.fecha;
    form.vacuna.value = anuncio.vacuna;
}

const opcionAnimales = ()=>{
    let opcion="";
    if(document.getElementById('perro').checked)
        opcion = "perro";
    else if(document.getElementById('gato').checked)
    opcion = "gato";

    return opcion;
}


const opcionEdad = ()=>{
    let opcion="";
    if(document.getElementById('mayor').checked)
        opcion = "mayor de 10 años";
    else if(document.getElementById('gato').checked)
    opcion = "mayor de 10 años";

    return opcion;
}