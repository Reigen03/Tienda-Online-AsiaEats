<?php
    // Recogemos los datos del ajax
    $dni = $_POST["nif"];
    $nombre = $_POST["name"];
    $correo = $_POST["mail"];
    $pass = $_POST["cont"];
    $administrador = $_POST["admi"];

    $passwordReal = md5($pass);

    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Hacemos la modificacion del usuario.
    $modificacion = "UPDATE usuarios SET nombre='$nombre', correo='$correo', pass='$passwordReal', administrador='$administrador' WHERE dni LIKE '$dni';";
    $resultado = mysqli_query($conexion, $modificacion);

    // Enviamos el resultado al frontend.
    echo $resultado;

    // Cerramos la conexión.
    mysqli_close($conexion);
?>