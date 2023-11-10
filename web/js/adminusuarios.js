/* Esta función muestra la ventana modal de adición, luego recoge los datos cuando se pulsa el botón
y los envía al backend para registrar el usuario. */
function adicionUsuario() {
    $("#modalAdicionUsus").css("animation-name", "aparicion");
    $("#modalAdicionUsus").show();

    $("#btnCrearUsu").on("click", function() {
        let dni = $("#dniUsu").val();
        let nombre = $("#nomUsu").val();
        let correo = $("#mailUsu").val();
        let pass = $("#passUsu").val();
        let admin = $("#esAdmin").val();

        let realAdmin;
        admin == "si" ? realAdmin = 1 : realAdmin = 0;
        
        var conexion = $.ajax({
            url: "../controladores/gestaddusuarios.php",
            type: "POST",
            dataType: "text",
            data: {nif: dni, name: nombre, mail: correo, passwd: pass, admin: realAdmin}
        });
    
        conexion.done(function(respuesta) {
            if (respuesta == "1") {
                Swal.fire({
                    icon: "success",
                    title: "Usuario registrado exitosamente"
                }).then(function() {
                    location.reload();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "OOOPS",
                    text: "No se ha podido registrar el usuario..."
                });
            }
        });
    
        conexion.fail(function(jqXHR, textStatus, errorThrown) {
            console.log("Error de solicitud: " + textStatus + errorThrown);
        });
    });
}

/* Esta función muestra la ventana modal de edición del usuario, y al ser pulsado el botón de editar 
recoge los datos de los inputs y los envía al backend para hacer el update. */
function modificacionUsuario(dni) {
    $("#modalModUsu").css("animation-name", "aparicion");
    $("#modalModUsu").show();

    $("#dniModUsu").val(dni);

    $("#btnModUsu").on("click", function() {
        let nombre = $("#nomModUsu").val();
        let email = $("#mailModUsu").val();
        let passwd = $("#passModUsu").val();
        let admin = $("#esModAdmin").val();

        let realAdmin;
        admin == "si" ? realAdmin = 1 : realAdmin = 0;

        var conexion = $.ajax({
            url: "../controladores/gestmodusuarios.php",
            type: "POST",
            dataType: "text",
            data: {nif: dni, name: nombre, mail: email, cont: passwd, admi: realAdmin}
        });
    
        conexion.done(function(respuesta) {
            console.log(respuesta);

            if (respuesta == "1") {
                Swal.fire({
                    icon: "success",
                    title: "Usuario modificado exitosamente"
                }).then(function() {
                    location.reload();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "OOOPS",
                    text: "No se ha podido modificar el usuario..."
                });
            }
        });
    
        conexion.fail(function(jqXHR, textStatus, errorThrown) {
            console.log("Error de solicitud: " + textStatus + errorThrown);
        });
    });
}

/* Esta función recoge el dni del usuario, y con un ajax manda ese dni para indicarle al
backend que elimine ese usuario en concreto. */
function eliminacionUsuario(dni) {
    var conexion = $.ajax({
        url: "../controladores/gesteliminacion.php",
        type: "POST",
        dataType: "text",
        data: {id: dni, tipo: "usuario"}
    });

    conexion.done(function(respuesta) {
        console.log(respuesta);

        if (respuesta == "1") {
            Swal.fire({
                icon: "success",
                title: "Usuario eliminado exitosamente",
                text: "Usuario con dni " + dni + " eliminado."
            }).then(function() {
                location.reload();
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "OOOPS",
                text: "No se ha podido eliminar el usuario..."
            });
        }
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
}