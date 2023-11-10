/* Esta función hará una llamada ajax cuando se haga click en el carrito. Esta llamada consultará las líneas de carrito del 
usuario y llamará una función que las recorrerá una a una para mostrarlas. También ocultará la ventana modal del carrito
al hacer click al botón correspondiente, el de cerrar. También habrá un evento que al pulsar el botón de realizar el
pedido, se llamará a la función que se encarga de realizarlo. */
$(document).ready(function() {
    $("#iconCart").on("click", function() {
        var conexion = $.ajax({
            url: "../controladores/carrito.php",
            type: "GET",
            dataType: "json"
        });
            
        conexion.done(function(respuesta) {
            recogerProds(respuesta);
        });
            
        conexion.fail(function(jqXHR, textStatus, errorThrown) {
            console.log("Error de solicitud: " + textStatus + errorThrown);
        });
    });

    $("#btnCer").on("click", function() {
        $("#modalCarrito").css("animation-name", "desaparicion");

        setTimeout(function() {
            $("#modalCarrito").hide();
        }, 400);
    });

    $("#btnPedido").on("click", function() {
        realizarPedido();
    });
});

/* Esta función recorre los productos del carrito y llama una función que los colocará uno a uno en una tabla. La función llamada
devolverá un número, que es el precio del producto en cuestión, y este se sumará a los otros precios para recoger así el total
y mostrarlo luego. */
function recogerProds(productos) {
    $("#productosCar").html("");

    let nombre;
    let precio;
    let cantidad;
    let precioFinal = 0;

    for (i = 0 ; i < productos.length ; i++) {
        nombre = productos[i].nombre;
        precio = productos[i].precio;
        cantidad = productos[i].cantidad;

        precioFinal += mostrarCarrito(nombre, precio, cantidad);
    }

    let precioFinalReal = precioFinal.toFixed(2);
    let precioFin = String(precioFinalReal.replace(".", ","));

    let filaTot = $("<tr></tr>");
    let casillaTot = $("<td><b>Total<b></td>");
    let casillaTotPre = $("<td colspan=\"2\">" + precioFin + "€</td>");
    
    filaTot.append(casillaTot, casillaTotPre);
    $("#productosCar").append(filaTot);
}

// Esta función muestra la ventana modal del carrito, crea la fila del producto con sus contenidos y calcula el precio total del producto.
function mostrarCarrito(nombre, precio, cantidad) {
    $("#modalCarrito").css("animation-name", "aparicion");
    $("#modalCarrito").show();
    let precioReal = precio.replace(".", ",");

    let filaProducto = $("<tr></tr>");
    let casillaNom = $("<td>" + nombre + "</td>");
    let casillaPre = $("<td>" + precioReal + "€/u</td>");
    let casillaCan = $("<td>" + cantidad + "</td>");

    filaProducto.append(casillaNom, casillaPre, casillaCan);
    $("#productosCar").append(filaProducto);

    let precioTotal = Number(precio) * Number(cantidad);
    return precioTotal;
}