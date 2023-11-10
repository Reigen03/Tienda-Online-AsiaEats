/* Al darle al botón de detalles del producto, se llamará a esta función, que recibirá el id y hará una consulta ajax donde
se lo pase al php para que haga la consulta y así recibir los datos de dicho producto que se mostrarán en la ventana modal. */
function consultarDetalles(id) {
    var conexion = $.ajax({
        url: "../controladores/detalles.php",
        type: "POST",
        dataType: "json",
        data: {producto: id},
    });
        
    conexion.done(function(respuesta) {
        recogerDetalles(respuesta);
    });
        
    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
}

// Esta función guarda en variables los distintos datos del producto y llama la función que crea la ventana modal.
function recogerDetalles(producto) {
    var codigo = producto.id;
    var nombre = producto.nombre;
    var precio = producto.precio;
    var imagen = producto.img;
    var descripcion = producto.descripcion;
    
    mostrarVentana(codigo, nombre, precio, imagen, descripcion);
}

/* La ventana modal ya está creada en html, pero está sin datos, y esta función rellena los datos con la información del producto.
También crea un evento para el botón de añadir carrito, que llamará a una función de carritoadd.js para crear una línea de carrito. */
function mostrarVentana(codigo, nombre, precio, imagen, descripcion) {
    $("#modalDetallesProd").css("animation-name", "aparicion");
    $("#modalDetallesProd").show();
    $("#cantProd").val(1);

    let imgProd = $("<img>");
    imgProd.attr("src", "../../img/productos/" + imagen);

    $("#imgDet").html(imgProd);

    $("#spanNom").text(nombre);

    $("#spanDesc").text(descripcion);

    let precioProd = precio.replace(".", ",");
    $("#spanPrec").text(precioProd + "€/u");

    let btnAddCarr = $(".btnAddCarr");

    $(btnAddCarr).on("click", function() {
        let cantidad = $("#cantProd").val();

        productoAdd(codigo, cantidad, nombre);

        $(btnAddCarr).unbind("click");
    });
}

// Evento para el botón que cierra la ventana modal.
$(document).ready(function() {
    $("#btnCerrar").on("click", function() {
        $("#modalDetallesProd").css("animation-name", "desaparicion");

        setTimeout(function() {
            $("#modalDetallesProd").hide();
        }, 400);
    });
});