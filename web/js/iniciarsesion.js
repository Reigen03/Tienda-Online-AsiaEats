/* Cuando se le haga click en el botón de iniciar sesión, se recogerán los datos del formulario y
se verá que son válidos. En caso de que si, se llamará a la función que creará la sesión con ajax. */
$(document).ready(function() {
    $("#btnEnviar").on("click", function() {
        $("#errorDni").text("");
        $("#errorPass").text("");

        var inputsCorrectos = 0;

        var dni = $("#dniUsu").val();
        var pass = $("#passUsu").val();

        var regexDni = /^[1-9]{8}[A-W]{1}$/;
        var regexPass = /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$)).{8,25}$/;

        if (regexDni.test(dni) == true) {
            inputsCorrectos++;
        } else {
            $("#errorDni").text("El dni introducido no es válido.");
        }

        if (regexPass.test(pass) == true) {
            inputsCorrectos++;
        } else {
            $("#errorPass").text("La contraseña debe tener mínimo 8 carácteres, 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial.");
        }

        if (inputsCorrectos == 2)
            crearSesion(dni, pass);
    });
});

/*/ Esta función hará una llamada ajax a un php que comprobará si existe un usuario con esas credenciales.
En caso de que exista, el backend habrá creado la sesión y se redirigirá a la página de inicio. En caso 
de que no, se mostrará una alerta. */
function crearSesion(dni, pass) {
    var conexion = $.ajax({
        url: "../controladores/iniciarsesion.php",
        type: "POST",
        dataType: "text",
        data: {dniUsu: dni, passUsu: pass},
    });

    conexion.done(function(respuesta) {
        if (respuesta == "incorrecto") {
            Swal.fire({
                icon: "error",
                title: "Vaya...",
                text: "Las credenciales son incorrectas."
            });
        } else {
            window.location.href = "../html/index.html";
        }
    });

    conexion.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error de solicitud: " + textStatus + errorThrown);
    });
}