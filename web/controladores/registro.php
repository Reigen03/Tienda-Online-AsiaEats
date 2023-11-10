<?php
    // Recogemos los datos del formulario que se han pasado del frontend.
    $dni = $_POST["dni"];
    $nombre = $_POST["nombre"];
    $mail = $_POST["correo"];
    $passwd = $_POST["password"];

    $passReal = md5($passwd);

    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Hacemos la insercion del usuario.
    $insercion = "INSERT INTO usuarios (dni, nombre, correo, pass, administrador) VALUE ('$dni', '$nombre', '$mail', '$passReal', 0);";
    $resultado = mysqli_query($conexion, $insercion);

    // Enviamos el resultado al frontend.
    echo $resultado;

    // Cerramos la conexión.
    mysqli_close($conexion);
?>