<?php
    // Recogemos los datos del ajax
    $dni = $_POST["nif"];
    $nombre = $_POST["name"];
    $correo = $_POST["mail"];
    $password = $_POST["passwd"];
    $administrador = $_POST["admin"];
    
    $passwordReal = md5($password);

    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Hacemos la insercion del producto.
    $insercion = "INSERT INTO usuarios (dni, nombre, correo, pass, administrador) VALUE ('$dni', '$nombre', '$correo', '$passwordReal', '$administrador');";
    $resultado = mysqli_query($conexion, $insercion);

    // Enviamos el resultado al frontend.
    echo $resultado;

    // Cerramos la conexión.
    mysqli_close($conexion);
?>