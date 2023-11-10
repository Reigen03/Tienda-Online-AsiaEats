<?php
    // Recibimos la variable que nos dirá la categoría de los productos.
    $pagina = $_POST["pagina"];

    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Hacemos la consulta de 16 productos aleatorios y guardamos el resultado. Dependiendo de la página la consulta variará.
    if ($pagina == "inicio") {
        $consulta = "SELECT idprod, nombre, precio, img FROM productos ORDER BY rand() LIMIT 16;";
    } else if ($pagina == "alimentacion") {
        $consulta = "SELECT idprod, nombre, precio, img FROM productos WHERE categoria LIKE 'alimentacion' ORDER BY rand() LIMIT 16;";
    } else if ($pagina == "bebidas") {
        $consulta = "SELECT idprod, nombre, precio, img FROM productos WHERE categoria LIKE 'bebida' ORDER BY rand() LIMIT 16;";
    } else if ($pagina == "populares") {
        $consulta = "SELECT idprod, nombre, precio, img FROM productos WHERE popular = 1 ORDER BY rand() LIMIT 16;";
    }

    $resultados = mysqli_query($conexion, $consulta);
    $filas = mysqli_fetch_all($resultados);

    // Cerramos la conexión.
    mysqli_close($conexion);

    /* Creamos un array, que guardará los productos. Luego recorremos los resultados de la consulta y por
    cada registro creamos un array de producto con sus datos. Cada array de producto lo añadimos al array
    de la lista y esa lista la convertimos a json, para poder enviarselo al frontend. */
    $listaProductos = array();

    foreach ($filas as $fila) {
        $producto = array("id" => $fila[0], "nombre" => $fila[1], "precio" => $fila[2], "img" => $fila[3]);

        array_push($listaProductos, $producto);
    }

    echo json_encode($listaProductos);
?>