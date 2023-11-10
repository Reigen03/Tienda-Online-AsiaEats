/* Esta función muestra la ventana modal de adición, luego recoge los datos cuando se pulsa el botón
y los envía al backend para realizar la inserción del nuevo producto. */
function adicionProducto() {
    $("#modalAdicionProds").css("animation-name", "aparicion");
    $("#modalAdicionProds").show();

    $("#btnCrearProd").on("click", function() {
        let nombre = $("#nomProd").val();
        let precio = $("#precProd").val();
        let imagen = $("#imgProd").val();
        let descripcion = $("#descProd").val();
        let tipo = $("#tipoProd").val();
        let popular = $("#esPopular").val();

        let popularReal;
        popular == "si" ? popularReal = 1 : popularReal = 0;

        var conexion = $.ajax({
            url: "../controladores/gestaddproductos.php",
            type: "POST",
            dataType: "text",
            data: {name: nombre, prec: precio, img: imagen, desc: descripcion, type: tipo, pop: popularReal}
        });
    
        conexion.done(function(respuesta) {
            if (respuesta == "1") {
                Swal.fire({
                    icon: "success",
                    title: "Artículo añadido exitosamente"
                }).then(function() {
                    location.reload();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "OOOPS",
                    text: "No se ha podido añadir el producto..."
                });
            }
        });
    
        conexion.fail(function(jqXHR, textStatus, errorThrown) {
            console.log("Error de solicitud: " + textStatus + errorThrown);
        });
    });
}

/* Esta función muestra la ventana modal de edición del producto, y al ser pulsado el botón de editar 
recoge los datos de los inputs y los envía al backend para hacer el update. */
function modificacionProducto(codigo) {
    $("#modalModProds").css("animation-name", "aparicion");
    $("#modalModProds").show();

    $("#codMod").text(codigo);

    $("#btnModProd").on("click", function() {
        let nombre = $("#nomModProd").val();
        let precio = $("#precModProd").val();
        let imagen = $("#imgModProd").val();
        let descripcion = $("#descModProd").val();
        let tipo = $("#tipoModProd").val();
        let popular = $("#esPopularMod").val();

        let popularReal;
        popular == "si" ? popularReal = 1 : popularReal = 0;

        var conexion = $.ajax({
            url: "../controladores/gestmodproductos.php",
            type: "POST",
            dataType: "text",
            data: {cod: codigo, name: nombre, prec: precio, img: imagen, desc: descripcion, type: tipo, pop: popularReal}
        });
    
        conexion.done(function(respuesta) {
            if (respuesta == "1") {
                Swal.fire({
                    icon: "success",
                    title: "Artículo modificado correctamente"
                }).then(function() {
                    location.reload();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "OOOPS",
                    text: "No se ha podido modificar el producto..."
                });
            }
        });
    
        conexion.fail(function(jqXHR, textStatus, errorThrown) {
            console.log("Error de solicitud: " + textStatus + errorThrown);
        });
    });
}

/* Esta función recoge el id del producto, y con un ajax manda ese id para indicarle al
backend que elimine ese producto en concreto. */
function eliminacionProducto(codigo) {
    var conexion = $.ajax({
        url: "../controladores/gesteliminacion.php",
        type: "POST",
        dataType: "text",
        data: {id: codigo, tipo: "producto"}
    });

    conexion.done(function(respuesta) {
        if (respuesta == "1") {
            Swal.fire({
                icon: "success",
                title: "Artículo eliminado exitosamente",
                text: "Producto " + codigo + " eliminado."
            }).then(function() {
                location.reload();
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "OOOPS",
                text: "No se ha podido eliminar el producto..."
            });
        }
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
}