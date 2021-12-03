export const crearAnuncio = (data) =>{

    const divAnuncios =document.getElementById("divAnuncios");

    data.forEach((element, index) => {
        
        const articulo = document.createElement("article");
                articulo.classList.add("articulo");

        const titulo = document.createElement("h2");
            titulo.classList.add("texto");
            titulo.textContent = element.titulo;
            articulo.appendChild(titulo);
        
        const descripcion = document.createElement("p");
            descripcion.classList.add("texto");
            descripcion.textContent = element.descripcion;
            articulo.appendChild(descripcion);

        const precio = document.createElement("p");
            precio.classList.add("texto");
            precio.textContent = element.precio;
            articulo.appendChild(precio);
        
        const animal = document.createElement("p");
            animal.classList.add("texto");
            animal.textContent = element.animal;
            articulo.appendChild(animal);

        const raza = document.createElement("p");
             raza.classList.add("texto");
             raza.textContent = element.raza;
            articulo.appendChild(raza);



        divAnuncios.appendChild(articulo);
    });

}

/*

    constructor(id,titulo,descripcion,animal, precio){
        this.id = id ;
        this.titulo = titulo ;
        this.descripcion = descripcion ;
        this.animal = animal ;
        this.precio = precio ;
        
    }
}

export default class AnuncioAnimales extends Anuncio {

    constructor(id,titulo,descripcion,animal,precio,raza, fecha,vacuna) {
        super(id,titulo,descripcion,animal,precio);
        this.raza = raza;
        this.fecha = fecha;
        this.vacuna = vacuna;
    }
  }



*/