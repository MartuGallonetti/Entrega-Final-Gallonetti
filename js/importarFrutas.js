//DECLARAMOS UNA CLASE FRUTA CON SU CONSTRUCTOR
class Fruta {
    constructor(nombre, precio, stock, imagen, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.id = id;
    }
}
const arrayFrutas = [];
//Creamos una funcion para importar el archivo json con fetch,
// y crear objetos de la clase Fruta recorriendo el array de objetos
const importarFrutas = async () => {
    await fetch("../json/frutas.json")
        .then((res) => res.json())
        .then((data) => {
            //recorremos el array de objetos y creamos un nuevo objeto de la clase Fruta por cada uno
            data.forEach((fruta) => {
                const frutaNueva = new Fruta(
                    fruta.nombre,
                    fruta.precio,
                    fruta.stock,
                    fruta.imagen,
                    fruta.id
                );
                //pusheamos cada objeto creado a partir del json, dentro del arrayFrutas
                arrayFrutas.push(frutaNueva);
            });
        });
};
