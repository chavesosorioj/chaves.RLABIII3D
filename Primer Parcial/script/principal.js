import { crearAnuncio } from "./publicacionAnuncio.js";

const anuncios = JSON.parse(localStorage.getItem("animales")) || [];

if(anuncios.localStorage !=0){
    crearAnuncio(anuncios);
}