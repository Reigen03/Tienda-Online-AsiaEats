/* Cuando se cargue el documento, se hará una llamada ajax a un php que recogerá los productos de la
BD y los traerá en forma de json para procesarlos. */
function cargaProductos(categoria) {
    var conexion = $.ajax({
        url: "../controladores/productos.php",
        type: "POST",
        dataType: "json",
        data: {pagina: categoria},
    });

    conexion.done(function(respuesta) {
        obtenerDatos(respuesta);
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
}

/* Con esta función se recorren todos los productos del json, y por cada uno se llama la función
que los manda al html.*/
function obtenerDatos(productos) {
    var codigo;
    var nombre;
    var precio;
    var imagen;

    for (i = 0 ; i < productos.length ; i++) {
        codigo = productos[i].id;
        nombre = productos[i].nombre;
        precio = productos[i].precio;
        imagen = productos[i].img;

        crearProducto(codigo, nombre, precio, imagen);
    }
}

// Con esta función se crea el producto, con su imagen, nombre, precio y botón de detalles.
function crearProducto(codigo, nombre, precio, imagen) {
    // Aquí se crea el producto
    let divProducto = $("<div></div>");
    divProducto.addClass("producto hijosCentrados col-lg-3 col-md-4 col-sm-6 col-12");
    $("#inicio").append(divProducto);

    // Aquí se añade la imagen.
    let divImg = $("<div></div>");
    divImg.addClass("imgProd hijosCentrados");
    let img = $("<img>");
    img.addClass("prodImg");
    img.attr("src", "../../img/productos/" + imagen);
    img.attr("alt", "Producto");
    divImg.append(img);
    divProducto.append(divImg);

    // Aquí se añade el nombre del producto.
    let divNombre = $("<div></div>");
    divNombre.addClass("nombreProd hijosCentrados");
    let spanNombre = $("<span>" + nombre + "</span>");
    spanNombre.addClass("txtNom");
    divNombre.append(spanNombre);
    divProducto.append(divNombre);

    // Aquí se añade el botón del producto.
    let divBtn = $("<div></div>");
    divBtn.addClass("detallesProd hijosCentrados");
    let btn = $("<button>Detalles</button>");
    btn.addClass("btnDet");
    btn.attr("id", codigo);
    divBtn.append(btn);
    divProducto.append(divBtn);

    /* Le damos al botón creado un evento que recogerá el id del botón clicado y se lo pasará
    a la función de detalles.js que se encarga de hacer la llamada ajax al php correspondiente*/
    $(btn).on("click", function() {
        consultarDetalles($(this).attr("id"));
    });

    // Aquí se añade el precio.
    let divPrecio = $("<div></div>");
    divPrecio.addClass("precioProd hijosCentrados");
    let precioReal = precio.replace(".", ",");
    let spanPrecio = $("<span>" + precioReal + "€</span>");
    divPrecio.append(spanPrecio);
    divProducto.append(divPrecio);
}