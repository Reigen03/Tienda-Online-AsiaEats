<?php
    // Recogemos los datos del ajax
    $codigo = $_POST["cod"];
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

    // Hacemos la modificacion del producto.
    $modificacion = "UPDATE productos SET nombre='$nombre', precio='$precio', img='$imagen', descripcion='$descripcion', categoria='$tipo', popular='$popular' WHERE idprod LIKE '$codigo';";
    $resultado = mysqli_query($conexion, $modificacion);

    // Enviamos el resultado al frontend.
    echo $resultado;

    // Cerramos la conexión.
    mysqli_close($conexion);
?>