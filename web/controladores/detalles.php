<?php
    // Recogemos del frontend el id que se ha pasado a traves del post
    $id = $_POST["producto"];

    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Hacemos la consulta del producto necesitado y guardamos el resultado.
    $consulta = "SELECT idprod, nombre, precio, img, descripcion FROM productos WHERE idprod = $id";

    $resultado = mysqli_query($conexion, $consulta);
    $fila = mysqli_fetch_row($resultado);

    // Cerramos la conexión.
    mysqli_close($conexion);

    // Recogemos los datos devueltos en un array y lo convertimos a json para mandarlo al frontend
    $producto = array("id" => $fila[0], "nombre" => $fila[1], "precio" => $fila[2], "img" => $fila[3], "descripcion" => $fila[4]);

    echo json_encode($producto);
?>