<?php
    // Recogemos los datos del ajax
    $nombre = $_POST["name"];
    $precio = $_POST["prec"];
    $imagen = $_POST["img"];
    $descripcion = $_POST["desc"];
    $tipo = $_POST["type"];
    $popular = $_POST["pop"];

    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Hacemos la insercion del producto.
    $insercion = "INSERT INTO productos (nombre, precio, img, descripcion, categoria, popular) VALUE ('$nombre', $precio, '$imagen', '$descripcion', '$tipo', '$popular');";
    $resultado = mysqli_query($conexion, $insercion);

    // Enviamos el resultado al frontend.
    echo $resultado;

    // Cerramos la conexión.
    mysqli_close($conexion);
?>