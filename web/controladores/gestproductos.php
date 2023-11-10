<?php
    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Realizamos la consulta de todos los productos.
    $consulta = "SELECT idprod, nombre, precio, img, descripcion FROM productos;";
    $resultados = mysqli_query($conexion, $consulta);
    $filas = mysqli_fetch_all($resultados);

    // Cerramos la conexión.
    mysqli_close($conexion);

    /* Creamos un array, que guardará los productos. Luego recorremos los resultados de la consulta y por
    cada registro creamos un array de producto con sus datos. Cada array de producto lo añadimos al array
    de la lista y esa lista la convertimos a json, para poder enviarselo al frontend. */
    $listaProductos = array();

    foreach ($filas as $fila) {
        $producto = array("id" => $fila[0], "nombre" => $fila[1], "precio" => $fila[2], "img" => $fila[3], "desc" => $fila[4]);

        array_push($listaProductos, $producto);
    }

    echo json_encode($listaProductos);
?>