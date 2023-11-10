/* Cuando se pulse el botón de registrarse, se cogerán los valores de todos los inputs y se validarán con expresiones
regulares para ver si las credenciales son todas correctas. En caso de que si, se llamará la función que, con un ajax,
enviará los datos al php para realizar la inserción. En caso de que no, se mostrará que no se ha registrado el usuario
y se mostrarán mensajes indicando dónde se ha escrito algo mal. */
$(document).ready(function() {
    $("#btnRegistrar").on("click", function() {
        $("#mensajeNom, #mensajeDni, #mensajeCorr1, #mensajeCorr2, #mensajePass1, #mensajePass2").text("");

        let inputsCorrectos = 0;

        let nomUsu = $("#nomRegistro").val();
        let dniUsu = $("#dniRegistro").val();
        let mailUsu = $("#corrRegistro1").val();
        let mailUsuRep = $("#corrRegistro2").val();
        let passUsu = $("#passRegistro1").val();
        let passUsuRep = $("#passRegistro2").val();

        let regexNom = /^[A-Za-z]{3,75}$/;
        let regexDni = /^[1-9]{8}[A-W]{1}$/;
        let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let regexPass = /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$)).{8,25}$/;

        regexNom.test(nomUsu) ? inputsCorrectos++ : $("#mensajeNom").text("Nombre introducido no válido.");

        regexDni.test(dniUsu) ? inputsCorrectos++ : $("#mensajeDni").text("El DNI no es válido.");

        regexMail.test(mailUsu) ? inputsCorrectos++ : $("#mensajeCorr1").text("El mail introducido no es válido.");

        mailUsuRep == mailUsu ? inputsCorrectos++ : $("#mensajeCorr2").text("Los dos correos deben coincidir.");

        regexPass.test(passUsu) ? inputsCorrectos++ : $("#mensajePass1").text("La contraseña debe tener mínimo 8 carácteres, 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial.");

        passUsuRep == passUsu ? inputsCorrectos++ : $("#mensajePass2").text("Las dos contraseñas deben coincidir.");

        inputsCorrectos == 6 ? registrarUsuario(nomUsu, dniUsu, mailUsu, passUsu) : indicarFallo();
    });
});

// Esta función envía los datos al backend para hacer una inserción a la base de datos y crear el usuario.
function registrarUsuario(nomUsu, dniUsu, mailUsu, passUsu) {
    var conexion = $.ajax({
        url: "../controladores/registro.php",
        type: "POST",
        dataType: "text",
        data: {nombre: nomUsu, dni: dniUsu, correo: mailUsu, password: passUsu}
    });

    conexion.done(function(respuesta) {
        respuesta == 1 ? inidicarExito() : indicarFallo();
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
}

// Esta función mostrará una ventana de éxito cuando todo vaya bien y el usuario se haya registrado.
function inidicarExito() {
    Swal.fire({
        icon: "success",
        title: "¡Bien!",
        text: "El usuario se ha registrado con éxito. ¡Ve a iniciar sesión!"
    }).then(function() {
        window.location.href = "../html/index.html";
    });
}

// Esta función mostrará una ventana de error cuando algo vaya mal.
function indicarFallo() {
    Swal.fire({
        icon: "error",
        title: "Vaya...",
        text: "El usuario no se ha podido registrar"
    });
}