/* Esta función pide al php todos los usuarios para luego mostrarlos en
la página de administración. */
$(document).ready(function() {
    var conexion = $.ajax({
        url: "../controladores/gestusuarios.php",
        type: "GET",
        dataType: "json",
    });

    conexion.done(function(respuesta) {
        mostrarUsuario(respuesta);
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });

    // Eventos de la modal de añadir usuario
    $("#btnAddUsu").on("click", function() {
        adicionUsuario();
    });

    $("#btnClose").on("click", function() {
        $("#modalAdicionUsus").css("animation-name", "desaparicion");

        setTimeout(function() {
            $("#modalAdicionUsus").hide();
        }, 400);
    });

    // Eventos de la modal de editar usuario.
    $("#btnCloseMod").on("click", function() {
        $("#modalModUsu").css("animation-name", "desaparicion");

        setTimeout(function() {
            $("#modalModUsu").hide();
        }, 400);
    });
});

/* Esta función recoge el json de los usuarios, y los recorre uno a uno. En cada iteración creará una fila de la tabla con los
datos del usuario en cuestión. */
function mostrarUsuario(usuarios) {
    let dni;
    let nombre;
    let correo;
    let administrador;

    for (i = 0 ; i < usuarios.length ; i++) {
        dni = usuarios[i].dni;
        nombre = usuarios[i].nombre;
        correo = usuarios[i].correo;
        administrador = usuarios[i].admin;

        colocarUsuario(dni, nombre, correo, administrador);
    }
}

/* Esta función crea la fila y las casillas donde se pondrán los datos de cada uno de los usuarios. También implementa eventos
para los botones de editar y eliminar usuario. */
function colocarUsuario(dni, nombre, correo, administrador) {
    let botonEditar = $("<button>Editar</button>");
    let botonEliminar = $("<button>Eliminar</button>");
    botonEditar.attr("class", "boton");
    botonEliminar.attr("class", "boton");

    let realAdmin;
    administrador == "1" ? realAdmin = "Si" : realAdmin = "No";

    let fila = $("<tr></tr>");
    let casillaDni = $("<td>" + dni + "</td>");
    let casillaNom = $("<td>" + nombre + "</td>");
    let casillaMail = $("<td>" + correo + "</td>");
    let casillaAdmin = $("<td>" + realAdmin + "</td>");
    let casillaBtn = $("<td></td>");

    casillaBtn.append(botonEditar, botonEliminar);

    botonEditar.on("click", function() {
        modificacionUsuario(dni);
    });

    botonEliminar.on("click", function() {
        eliminacionUsuario(dni);
    });

    fila.append(casillaDni, casillaNom, casillaMail, casillaAdmin, casillaBtn);
    $("#tablaGestUsu").append(fila);
}