<?php
    /* Recogemos del frontend los datos necesarios: el tipo del elemento a eliminar
    (producto, usuario o pedido) y su id. */
    $codigo = $_POST["id"];
    $tipoElemento = $_POST["tipo"];

    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Dependiendo del tipo de elemento, se realizará una eliminación u otra
    if ($tipoElemento == "producto") {
        $eliminacion = "DELETE FROM productos WHERE idprod LIKE $codigo;";
    } else if ($tipoElemento == "usuario") {
        $eliminacion = "DELETE FROM usuarios WHERE dni LIKE '$codigo';";
    } else if ($tipoElemento == "pedido") {
        $eliminacion = "DELETE FROM pedido WHERE idpedido LIKE $codigo;";
    }

    // Realizamos la consulta
    $resultados = mysqli_query($conexion, $eliminacion);

    // Cerramos la conexión.
    mysqli_close($conexion);

    // Devolvemos el resultado.
    echo $resultados;
?>