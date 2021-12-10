class Anuncio{

    constructor(id,titulo,descripcion,animal, precio){
        this.id = id ;
        this.titulo = titulo ;
        this.descripcion = descripcion ;
        this.animal = animal ;
        this.precio = precio ;
        
    }
}

export default class AnuncioAnimales extends Anuncio {

    constructor(id,titulo,descripcion,animal,precio,raza, fecha,vacuna, edad) {
        super(id,titulo,descripcion,animal,precio);
        this.raza = raza;
        this.fecha = fecha;
        this.vacuna = vacuna;
        this.edad = edad;
    }
  }
