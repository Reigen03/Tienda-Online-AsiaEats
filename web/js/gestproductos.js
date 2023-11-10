/* Esta función pide al php todos los productos para luego mostrarlos en la página
de administración. También hará que cuando se le haga click al botón de añadir producto
se le llame a la función correspondiente. */
$(document).ready(function() {
    var conexion = $.ajax({
        url: "../controladores/gestproductos.php",
        type: "GET",
        dataType: "json",
    });

    conexion.done(function(respuesta) {
        mostrarProducto(respuesta);
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });

    // Eventos de la modal de añadir producto
    $("#btnAddProd").on("click", function() {
        adicionProducto();
    });

    $("#btnClose").on("click", function() {
        $("#modalAdicionProds").css("animation-name", "desaparicion");

        setTimeout(function() {
            $("#modalAdicionProds").hide();
        }, 400);
    });

    // Eventos de la modal de editar producto.
    $("#btnCloseMod").on("click", function() {
        $("#modalModProds").css("animation-name", "desaparicion");

        setTimeout(function() {
            $("#modalModProds").hide();
        }, 400);
    });
});

/* Con esta función se recorren todos los productos del json, y por cada uno se llama la función
que los manda al html.*/
function mostrarProducto(productos) {
    var codigo;
    var nombre;
    var precio;
    var imagen;
    var descripcion;

    for (i = 0 ; i < productos.length ; i++) {
        codigo = productos[i].id;
        nombre = productos[i].nombre;
        precio = productos[i].precio;
        imagen = productos[i].img;
        descripcion = productos[i].desc;

        colocarProducto(codigo, nombre, precio, imagen, descripcion);
    }
}

/* Esta función crea un tr y añade varios td para mostrar la información del producto,
así como botones de gestión. */
function colocarProducto(codigo, nombre, precio, imagen, descripcion) {   
    let botonEditar = $("<button>Editar</button>");
    let botonEliminar = $("<button>Eliminar</button>");
    botonEditar.attr("class", "boton");
    botonEliminar.attr("class", "boton");
    let precioReal = precio.replace(".", ",");
    let img = $("<img>");
    img.attr("src", "../../img/productos/" + imagen)

    let fila = $("<tr></tr>");
    let casillaCod = $("<td>" + codigo + "</td>");
    let casillaNom = $("<td>" + nombre + "</td>");
    let casillaPre = $("<td>" + precioReal + "€</td>");
    let casillaImg = $("<td></td>");
    let casillaDes = $("<td>" + descripcion + "</td>");
    let casillaBtn = $("<td></td>");

    casillaImg.append(img);
    casillaBtn.append(botonEditar, botonEliminar);

    botonEditar.on("click", function() {
        modificacionProducto(codigo);
    });

    botonEliminar.on("click", function() {
        eliminacionProducto(codigo);
    });

    fila.append(casillaCod, casillaNom, casillaPre, casillaImg, casillaDes, casillaBtn);
    $("#tablaGestProd").append(fila);
}