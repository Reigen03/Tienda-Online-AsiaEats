<?php
    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Realizamos la consulta de todos los pedidos.
    $consulta = "SELECT idpedido, fecha, dni, direntrega, preciototal FROM pedido;";
    $resultados = mysqli_query($conexion, $consulta);
    $filas = mysqli_fetch_all($resultados);

    // Cerramos la conexión.
    mysqli_close($conexion);

    /* Creamos un array, que guardará los productos. Luego recorremos los resultados de la consulta y por
    cada registro creamos un array de producto con sus datos. Cada array de producto lo añadimos al array
    de la lista y esa lista la convertimos a json, para poder enviarselo al frontend. */
    $listaPedidos = array();

    foreach ($filas as $fila) {
        $pedido = array("id" => $fila[0], "fecha" => $fila[1], "usuario" => $fila[2], "direccion" => $fila[3], "precio" => $fila[4]);

        array_push($listaPedidos, $pedido);
    }

    echo json_encode($listaPedidos);
?>