//Funcion que rellena el modal de carrito con la información del array carrito.

const mostrarCarrito = (carrito) => {
    // Limpiamos el contenedor de mini cards en el modal
    const miniCardsContainer = document.getElementById("mini-cards-container");
    miniCardsContainer.innerHTML = "";
    //funcion que calcula total de la compra
    const calcularTotal = (carrito) => {
        let total = 0;
        carrito.forEach((producto) => {
            total = total + producto.subtotal;
        });
        return total;
    };
    // Recorremos el carrito para dibujar cada producto en las mini cards
    carrito.forEach((producto) => {
        const subtotal = producto.cantidad * producto.precio;
        producto.subtotal = subtotal;
        total = calcularTotal(carrito);
        // Crear y añadir la mini card en el modal
        const miniCard = document.createElement("div");
        miniCard.className = "mini-card";
        miniCard.innerHTML = `
        <div class="mini-card">
            <img src="${producto.imagen}" class="mini-card-img">
            <div class="mini-card-info">
                <h3>${producto.nombre}</h3>
                <div class="mini-card-info">
                    <div class="cantidad-info">
                        <button class="btn btn-secondary btn-restar-modal" data-id="${producto.id}"><i class="fa-solid fa-minus"></i></button>
                        <div id="cantidad-${producto.id}" class="cantidad">${producto.cantidad}</div>
                        <button class="btn btn-secondary btn-sumar-modal" data-id="${producto.id}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <p>Precio: $${producto.precio}</p>
                    <p>Subtotal: ${producto.subtotal}</p>
                </div>
            </div>
        </div>`;
        //añadimos el total
        carrito.length === 0
            ? (miniCardsContainer.innerHTML = `
            El Carrito está vacío
        `)
            : (totalCarrito.innerHTML = `
            <p class="margin:20px">Total: $${total}</p>
        `);
        if (carrito.length !== 0) {
            divEmail.innerHTML = `
    <label style= "padding: 10px">Ingrese su Correo electrónico</label>
    <input type="email" id="email" class="form-control" placeholder="Ingrese su email"></input>`;
            finalizarCompra.classList.add("show");

            btnVaciarCarrito.classList.add("show");
        }

        miniCardsContainer.appendChild(miniCard);
        // Escuchamos el boton de restar
        miniCard
            .querySelector(".btn-restar-modal")
            .addEventListener("click", () => {
                restarUnidadModal(producto.id);
            });

        // Escuchamos el boton de sumar
        miniCard
            .querySelector(".btn-sumar-modal")
            .addEventListener("click", () => {
                sumarUnidadModal(producto.id);
            });
    });
};

//Funcion que añade fruta si la encuentra al carrito y actualiza cantidad en el modal del carrito
const agregarAlCarrito = (idFruta) => {
    const idEncontrado = buscarFrutaPorId(arrayFrutas, idFruta);
    const idEnCarrito = buscarFrutaPorId(carrito, idFruta);
    if (idEnCarrito.length !== 0) {
        idEnCarrito[0].cantidad += 1;
        actualizarCantidadEnCarrito(idFruta, idEnCarrito[0].cantidad); //cada vez q se añade uno, lo actualiza en el modal
        alertify.success(`Se agregó ${idEnCarrito[0].nombre} al carrito`);
    } else {
        const productoNuevo = { ...idEncontrado[0], cantidad: 1 };
        carrito.push(productoNuevo);
        mostrarCarrito(carrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alertify.success(`Se agregó ${productoNuevo.nombre} al carrito`);
    }
};

//Funcion de restar unidad en el modal
const restarUnidadModal = (id) => {
    const cantidadCarrito = document.getElementById(`cantidad-${id}`);
    const cantidad = Number(cantidadCarrito.textContent);

    if (cantidad > 1) {
        cantidadCarrito.textContent = cantidad - 1;
        actualizarCantidadEnCarrito(id, cantidad - 1);
    } else if (cantidad === 1) {
        eliminarProductoDelCarrito(id);
    }
};
//Funcion de sumar unidad en el modal del carrito
const sumarUnidadModal = (id) => {
    const cantidadCarrito = document.getElementById(`cantidad-${id}`);
    const cantidad = Number(cantidadCarrito.textContent);
    cantidadCarrito.textContent = cantidad + 1;
    actualizarCantidadEnCarrito(id, cantidad + 1);
};
//Funcion que actualiza las cantidades en el carrito
const actualizarCantidadEnCarrito = (id, nuevaCantidad) => {
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad = nuevaCantidad;
        productoEnCarrito.subtotal = productoEnCarrito.precio * nuevaCantidad;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito(carrito);
    }
};
//Función que elimina el producto siempre y cuando sea menor a 1
const eliminarProductoDelCarrito = (id) => {
    const productoIndex = carrito.findIndex((producto) => producto.id === id);

    if (productoIndex !== -1) {
        carrito.splice(productoIndex, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito(carrito);
        alertify.error("Se ha eliminado el producto del carrito");
        //Si el carrito no está vacio, mostramos el input para el email, sino dejamos vacio
        actualizarEstadoModal(carrito);
    }
};

//Funcion que compara si el carrito está vacío o si tiene productos y muestra lo necesario.
//Si está vacío, no muestra ni el input del mail, ni el boton de finalizar compra, ni de vaciar carrito.
//Si tiene algun producto, muestra todo.
const actualizarEstadoModal = (carrito) => {
    const miniCardsContainer = document.getElementById("mini-cards-container");
    const divEmail = document.getElementById("email-submit");

    if (carrito.length === 0) {
        miniCardsContainer.innerHTML = `<p>El carrito está vacío</p>`;
        finalizarCompra.classList.remove("show");
        btnVaciarCarrito.classList.remove("show");
        totalCarrito.innerHTML = ``;
        divEmail.innerHTML = ``;
    } else {
        finalizarCompra.classList.add("show");
        btnVaciarCarrito.classList.add("show");
        divEmail.innerHTML = `
            <label>Ingrese su Correo electrónico</label>
            <input type="email" id="email" class="form-control" placeholder="Ingrese su email"></input>`;
    }
};

//FUNCION QUE VACIA EL CARRITO tanto en el array como en el LS
const vaciarCarrito = () => {
    carrito.length = 0;
    localStorage.removeItem("carrito");
    total = 0;
    divEmail.innerHTML = ``;
    actualizarEstadoModal(carrito);
    mostrarCarrito(carrito);
};
