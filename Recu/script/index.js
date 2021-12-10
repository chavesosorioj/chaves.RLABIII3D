import AnuncioAnimales from "./anuncio.js";
import IdAnuncio from "./idAnuncios.js";

let idSeleccionado= "";

const listaAnuncios = JSON.parse(localStorage.getItem("animales")) || [];
const listaIDS = JSON.parse(localStorage.getItem("idsVisitados")) || [];
const cant = JSON.parse(localStorage.getItem("cant")) || [];

console.log(listaAnuncios);
console.log(listaIDS);

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
            opcionEdad()
        )
        getSpinner()
        setTimeout(()=>{
            altaAnuncio(nuevoAnuncio);
            limpiarSpinner();
          alerta("Animal agregado con existo");
          limpiarAlert();
        },2000);

    } 
}

function handlerClick(e){
    if(e.target.matches("td")){
        idSeleccionado = e.target.parentNode.dataset.id;
        console.log("id seleccionado: "+idSeleccionado);
        listaIDS.push(idSeleccionado);
        console.log(listaIDS);

    }else if(e.target.matches("#btnEliminar")){
        if(confirm("desea eliminar el id "+idSeleccionado+"?")){
            getSpinner();

            setTimeout(()=>{
                let auxId = listaAnuncios.findIndex(element=> element.id==idSeleccionado);
                //console.log(auxId);
                listaAnuncios.splice(auxId,1);
                almacenarDatos(listaAnuncios); 
                limpiarSpinner()
                alerta("Animal borrado con existo");
                limpiarAlert();

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
            let auxId = listaAnuncios.findIndex(nuevoAnuncio=> nuevoAnuncio.id==idSeleccionado);
                console.log(auxId);
                listaAnuncios.splice(auxId,1);
                listaAnuncios.push(nuevoAnuncio);
                almacenarDatos(listaAnuncios);
                alerta("Animal modificado con existo");
        }
    }else if(e.target.matches("#btnIds")){
        console.log("boton ids");
        tablaIDSClickeados(listaIDS);
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
    else if(document.getElementById('menor').checked)
        opcion = "menor de 10 años";

    return opcion;
}

const alerta = (texto)=>{
    
    const span = document.getElementById("spanAlert");
    span.setAttribute("style","color: white");
    document.getElementById("spanAlert").classList.add("alert");
    document.getElementById("spanAlert").appendChild(span);
    switch(texto){
        case "Animal agregado con existo":
            span.prepend(texto);
            document.getElementById("spanAlert").setAttribute("style","background-color: green");
            break;
        case "Animal borrado con existo":
            document.getElementById("spanAlert").setAttribute("style","background-color: red");
            span.prepend(texto);
            break;
        case "Animal modificado con existo":
            span.prepend(texto);
            document.getElementById("spanAlert").setAttribute("style","background-color: orange");
            break;
    }


}
function limpiarAlert(){
    document.getElementById("spanAlert").innerHTML="";
}

const tablaIDSClickeados =(lista)=>{

    console.log(lista);
    renderizarLista(crearTablaIds(lista), document.getElementById("divTablaIds"));
   

}

function crearTablaIds(item){

    const tabla = document.createElement("table");
    tabla.appendChild(crearTheadID());
    tabla.appendChild(crearTBodyID(item));

    return tabla;
}

function crearTheadID(){
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    let aux = Array("Anuncio id", "Veces clickeado");

    for(const key in aux){
        const th = document.createElement("th");
        th.textContent = aux[key];
        tr.appendChild(th);  
    }
    thead.appendChild(tr);
    return thead;
}

function crearTBodyID(items){
    let aux=0;
    const tbody = document.createElement("tbody");
    items.forEach(item=>{
        const tr = document.createElement("tr");
        
        for(const key in items){
            aux =cantidad(items[key], items);
            let an = new IdAnuncio(items[key], aux);
            cant.push(an)
        }

        for(const key2 in cant){
            const td = document.createElement("td");
                td.textContent = key2;
                console.log(key2);
                tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
    return tbody;
}
const cantidad = (idAux, lista)=>{
    var cant =0;
    for(const key in lista){
        if(lista[key] == idAux){
            cant++;
        }
    }
    return cant;
}

