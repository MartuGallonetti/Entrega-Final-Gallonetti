//inicializamos el servicio de emailjs
emailjs.init("pvDY7rIDJypYZqU6H");

//Funcion que valida si el email tiene el formato correcto
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

//Funcion que envía el correo
const enviarCorreo = () => {
    const emailUsuario = document.getElementById("email");
    //Validamos si el email tiene el formato correcto
    if (!validarEmail(emailUsuario.value)) {
        alertify.error("Por favor, ingrese un correo electrónico válido.");
        return false;
    }

    // Ponemos los datos del correo a enviar

    const data = {
        to: `${emailUsuario.value}`,
        from: "mgallonetti03@gmail.com",
        subject: "Su compra en Verdulería Menguante",
        text: `Su compra fue realizada con éxito. El total de su compra es de $${total} y el detalle de la misma es:
        ${carrito.map((producto) => {
            return `Producto: ${producto.nombre}\nCantidad: ${producto.cantidad}\n Precio: $${producto.precio}\n Subtotal: $${producto.subtotal}\n\n
            `;
        })}`,
    };

    // Enviamos el correo con la librería emailjs
    emailjs
        .send("service_lt5barc", "template_javeiqu", data)
        .then((response) => {
            console.log("Correo enviado:", response);
            alertify.success(
                `Pedido creado con éxito! Se ha enviado un email con el detalle de su compra a ${emailUsuario.value}`
            );
            vaciarCarrito();

            totalCarrito.innerHTML = `
            Su compra ha sido realizada exitosamente`;
        })
        .catch((error) => {
            console.error("Error al enviar el correo:", error);
        });
};
