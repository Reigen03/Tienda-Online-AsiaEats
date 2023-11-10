<?php
    // Recogemos las credenciales.
    $dni = $_POST["dniUsu"];
    $passwd = $_POST["passUsu"];

    $passReal = md5($passwd);

    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Hacemos la consulta que comprueba si existe un usuario con esos datos y recogemos el resultado.
    $consulta = "SELECT EXISTS(SELECT * FROM usuarios WHERE dni LIKE '$dni' AND pass LIKE '$passReal') AS RESULT;";
    $resultado = mysqli_query($conexion, $consulta);
    $salida = mysqli_fetch_row($resultado);

    // Si existe el usuario, es decir, devuelve 1, se crea la sesión y lleva a inicio. Si no, vuelve al formulario.
    if ($salida[0] == 1) {
        session_start();

        $_SESSION["dni"] = $dni;
        $_SESSION["pass"] = $passReal;

        // Hacemos la consulta que mira si el usuario es administrador o no.
        $consulta = "SELECT administrador, nombre FROM usuarios WHERE dni LIKE '$dni' AND pass LIKE '$passReal';";
        $resultado = mysqli_query($conexion, $consulta);
        $esAdmin = mysqli_fetch_row($resultado);

        if ($esAdmin[0] == 1) {
            $_SESSION["tipo"] = "admin";
        } else {
            $_SESSION["tipo"] = "usuario";
        }

        $_SESSION["nombre"] = $esAdmin[1];

        echo "correcto";
    } else {
        echo "incorrecto";
    }

    // Cerramos la conexión.
    mysqli_close($conexion);
?>