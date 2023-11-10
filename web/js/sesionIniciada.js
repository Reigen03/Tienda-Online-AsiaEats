/* Esta función se ejecutará al cargar la página. Con una llamada ajax se comprobará qué tipo de usuario 
tiene la sesión iniciada. Dependiendo de cual sea, se llamará la función correspondiente. */
$(document).ready(function() {
    var conexion = $.ajax({
        url: "../controladores/sesioniniciada.php",
        type: "GET",
        dataType: "text",
    });

    conexion.done(function(respuesta) {
        let valores = respuesta.split("-");

        if (valores[0] == "usuario") {
            modoUsuario(valores[1]);
        } else if (valores[0] == "admin") {
            modoAdmin(valores[1]);
        } else {
            modoAnonimo();
        }
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
});

// Para un usuario normal que ha iniciado sesión. Se le añadirán las opciones de usuario correspondientes.
function modoUsuario(nombre) {
    if (window.location.href == "http://localhost/tienda/web/html/gestproductos.html") {
        window.location.href = "../html/index.html";
    }

    let linkLogOut = $("<a>Cerrar sesión</a>");

    linkLogOut.attr("href", "cerrarsesion.html");

    $("#opcionesUsu").append(linkLogOut);

    $("#nombreUsuario").text("Bienvenido, usuario " + nombre);
}

// Para un administrador que ha iniciado sesión. Se le añadirán las opciones de usuario correspondientes.
function modoAdmin(nombre) {
    let linkAdmin = $("<a>Administración</a>");
    let saltoLinea = $("<br>");
    let linkLogOut = $("<a>Cerrar sesión</a>");

    linkAdmin.attr("href", "gestproductos.html");
    linkLogOut.attr("href", "cerrarsesion.html");

    $("#opcionesUsu").append(linkAdmin);
    $("#opcionesUsu").append(saltoLinea);
    $("#opcionesUsu").append(linkLogOut);

    $("#nombreUsuario").text("Bienvenido, Admin " + nombre);
}

// Para cuando el usuario no haya iniciado sesión. Se le añadirán las opciones de usuario correspondientes.
function modoAnonimo() {
    if (window.location.href == "http://localhost/tienda/web/html/gestproductos.html") {
        window.location.href = "../html/index.html";
    }
    
    let linkRegistro = $("<a>Regístrate</a>");
    let saltoLinea = $("<br>");
    let linkLogin = $("<a>Inicia sesión</a>");

    linkRegistro.attr("href", "registro.html");
    linkLogin.attr("href", "iniciarsesion.html");

    $("#opcionesUsu").append(linkRegistro);
    $("#opcionesUsu").append(saltoLinea);
    $("#opcionesUsu").append(linkLogin);

    $("#nombreUsuario").text("Regístrate / inicia sesión");
}