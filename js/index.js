//Declaramos variables que su objetivo sea crear un "div" y le asignamos las respectivas clases
const plantillaCard = document.createElement("div");
plantillaCard.setAttribute("class", "col-md-4");
const noResultados = document.createElement("div");

//Creamos un carrito que obtiene el contenido del localstorage o genera un array vacio
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

//Chequeamos que no haya nada en LocalStorage, si hay, lo pusheamos al array carrito para que se muestre en el modal.
const carritoEnLS = JSON.parse(localStorage.getItem("carrito")) || [];
if (carritoEnLS.length == !0) {
    carrito.push(...carritoEnLS);
}
//Armamos la plantilla de la card.
plantillaCard.innerHTML = `
<div class="card mb-3" style="width: 18rem">
                            <img                         
                                class="card-img-top" style= "height: 250px"
                            />
                            <div class="card-body">
                                <h5 class="card-title">       </h5>
                                <p class="card-text"></p>
                                <button class="btn btn-primary btn-comprar"
                                    >Añadir al carrito</button
                                >
                            </div>
`;

//------------------------------- F U N C I O N E S ----------------------------------------------

// Funcion que crea una card vacia con cada elemento que recorre del array de frutas y
//  asigna la data correspondiente en cada card en pantalla, incluyendo el boton dinamico que ejecuta la funcion
// para agregar al carrito
const renderizar = (contenido) => {
    contenido.forEach((fruta) => {
        const card = plantillaCard.cloneNode(true);
        card.querySelector(".card-title").textContent = fruta.nombre;
        card.querySelector(".card-text").textContent = "$ " + fruta.precio;
        card.querySelector(".card-img-top").setAttribute("src", fruta.imagen);
        card.querySelector(".btn-comprar").setAttribute(
            "onclick",
            `agregarAlCarrito(${fruta.id})`
        );
        container.appendChild(card);
    });
};

//Funcion para buscar frutas mediante el id
const buscarFrutaPorId = (array, idFruta) => {
    return array.filter((fruta) => fruta.id === Number(idFruta));
};

//Función que busca fruta por su nombre
const buscarFrutaPorNombre = (nombreFruta) => {
    return arrayFrutas.filter(
        (fruta) => fruta.nombre.toLowerCase() === nombreFruta.toLowerCase()
    );
};

//Funcion para limpiar la pantalla que limpia la zona de las cards, y vacia el input de lo buscado
//lo utilizamos en el boton volver de la funcion noResul
const limpiar = () => {
    container.innerHTML = "";
    inputBusqueda.value = "";
};
//Funcion que limpia la pantalla y vuelve a renderizar el array de frutas, para utilizar luego de un a busqueda
const mostrarTodos = () => {
    limpiar();
    renderizar(arrayFrutas);
};

//Funcion que se ejecuta cuando no se obtienen resultados en la busqueda.
const noResul = () => {
    noResultados.innerHTML = `
<h2> No se encontraron resultados </h2>
`;
    container.appendChild(noResultados);
};

//------------------------------- D O M ----------------------------------------------
//Capturamos del dom.
const container = document.getElementById("cards-container");
const inputBusqueda = document.getElementById("textoDeBusqueda");
const botonBusqueda = document.getElementById("boton-buscar");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");
const botonMostrarTodos = document.getElementById("boton-mostrar-todos");
const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");
const dibujoCarrito = document.getElementById("dibujoCarrito");
const totalCarrito = document.getElementById("total-carrito");
const divEmail = document.getElementById("email-submit");
const finalizarCompra = document.getElementById("finalizar-compra");

//------------------------------- E S C U C H A M O S  E V E N T O S ----------------------------------------------

//Escuchamos el evento click del boton de busqueda y si no encuentra nada, ejecuta la funcion noResul.
//Caso contrario, utiliza la funcion renderizar pero no sobre el array de frutas, sino sobre el array que devuelve
//el metodo filter que utilizamos para la busqueda.
botonBusqueda.addEventListener("click", () => {
    const busqueda = buscarFrutaPorNombre(inputBusqueda.value);
    limpiar();
    if (busqueda.length === 0) {
        noResul();
    } else {
        renderizar(busqueda);
    }
});
//Escuchamos el boton de mostrar todos que ejecuta la funcion para que muestre nuevamente todas las frutas.
botonMostrarTodos.addEventListener("click", () => {
    mostrarTodos();
});
//Escuchamos el boton de vaciar carrito, y se ejecuta la funcion de vaciarCarrito y renderiza nuevamente el carrito
btnVaciarCarrito.addEventListener("click", () => {
    vaciarCarrito();
    totalCarrito.innerHTML = `
            El Carrito está vacío
        `;
    alertify.error("Se ha vaciado el carrito correctamente");
    mostrarCarrito(carrito);
});

//Escuchamos el click sobre el dibujoCarrito y abrimos el modal
dibujoCarrito.addEventListener("click", () => {
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();
});

//Escuchamos el boton finalizar compra
finalizarCompra.addEventListener("click", () => {
    enviarCorreo();
});

//------------------------------- F U N C I O N  I N I C I A L ----------------------------------------------

//Creamos una función general que ejecute la importacion de frutas desde el json, y que luego las dibuje en pantalla
const iniciar = async () => {
    await importarFrutas();
    renderizar(arrayFrutas);
    mostrarCarrito(carrito);
    actualizarEstadoModal(carrito);
};
iniciar();
