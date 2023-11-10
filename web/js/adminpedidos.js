/* Esta función muestra la ventana modal de adición, luego recoge los datos cuando se pulsa el botón
y los envía al backend para realizar la inserción del nuevo pedido. */
function adicionPedido() {
    console.log("Añadir pedido");
}

/* Esta función muestra la ventana modal de edición del pedido, y al ser pulsado el botón de editar 
recoge los datos de los inputs y los envía al backend para hacer el update. */
function modificacionPedido(codigo) {
    console.log("Modificar " + codigo);
}

/* Esta función recoge el id del pedido, y con un ajax manda ese id para indicarle al
backend que elimine ese pedido en concreto. */
function eliminacionPedido(codigo) {
    var conexion = $.ajax({
        url: "../controladores/gesteliminacion.php",
        type: "POST",
        dataType: "text",
        data: {id: codigo, tipo: "pedido"}
    });

    conexion.done(function(respuesta) {
        if (respuesta == "1") {
            Swal.fire({
                icon: "success",
                title: "Pedido eliminado exitosamente",
                text: "Pedido " + codigo + " eliminado."
            }).then(function() {
                location.reload();
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "OOOPS",
                text: "No se ha podido eliminar el pedido..."
            });
        }
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
}