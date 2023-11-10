// Esta función recibe los datos de detalles.js y los envía a un php para que haga la inserción de una linea de carrito.
function productoAdd(codigo, cantidad, nombre) {
    var conexion = $.ajax({
        url: "../controladores/carritoadd.php",
        type: "POST",
        dataType: "text",
        data: {cod: codigo, cant: cantidad},
    });

    conexion.done(function(respuesta) {
        mostrarResultado(respuesta, cantidad, nombre);
    });
        
    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
}

/* Esta función recoge la respuesta de la insericón dada por el php. Si devuelve 1 está bien y mostrará el seet alert
de éxito con el nombre y cantidad del producto añadido. Si el php no devuelve 1 la inserción no ha salido bien y 
mostrará el sweet alert correspondiente. */
function mostrarResultado(respuesta, cantidad, nombre) {
    if (respuesta == "1") {
        Swal.fire({
            icon: "success",
            title: "Artículo añadido correctamente",
            text: nombre + " X " + cantidad
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "OOOPS",
            text: "No se ha podido añadir el producto..."
        });
    }
}