// Esta función hará una llamada ajax al backend para que cierre la sesión.
$(document).ready(function() {
    var conexion = $.ajax({
        url: "../controladores/cerrarsesion.php",
        type: "GET",
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
});