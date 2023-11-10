/* Esta función pide al php todos los pedidos para luego mostrarlos en
la página de administración. */
$(document).ready(function() {
    var conexion = $.ajax({
        url: "../controladores/gestpedidos.php",
        type: "GET",
        dataType: "json",
    });

    conexion.done(function(respuesta) {
        mostrarPedidos(respuesta);
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
});

/* Con esta función se recorren todos los pedidos del json, y por cada uno se llama la función
que los manda al html.*/
function mostrarPedidos(pedidos) {
    var codigo;
    var fecha;
    var usuario;
    var direccion;
    var importe;

    for (i = 0 ; i < pedidos.length ; i++) {
        codigo = pedidos[i].id;
        fecha = pedidos[i].fecha;
        usuario = pedidos[i].usuario;
        direccion = pedidos[i].direccion;
        importe = pedidos[i].precio;

        colocarPedido(codigo, fecha, usuario, direccion, importe);
    }
}

/* Esta función crea un tr y añade varios td para mostrar la información del pedido,
así como botones de gestión. */
function colocarPedido(codigo, fecha, usuario, direccion, importe) {
    let botonEditar = $("<button>Editar</button>");
    let botonEliminar = $("<button>Eliminar</button>");
    botonEditar.attr("class", "boton");
    botonEliminar.attr("class", "boton");
    let importeReal = importe.replace(".", ",");

    let fila = $("<tr></tr>");
    let casillaCod = $("<td>" + codigo + "</td>");
    let casillaFec = $("<td>" + fecha + "</td>");
    let casillaUsu = $("<td>" + usuario + "</td>");
    let casillaDir = $("<td>" + direccion + "</td>");
    let casillaImp = $("<td>" + importeReal + "</td>");
    let casillaBtn = $("<td></td>");

    casillaBtn.append(botonEditar, botonEliminar);

    botonEditar.on("click", function() {
        modificacionPedido(codigo);
    });

    botonEliminar.on("click", function() {
        eliminacionPedido(codigo);
    });

    fila.append(casillaCod, casillaFec, casillaUsu, casillaDir, casillaImp, casillaBtn);
    $("#tablaGestPed").append(fila);
}