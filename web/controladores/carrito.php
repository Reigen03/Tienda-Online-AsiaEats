<?php
    // Cogemos la sesión activa, si es que hay una.
    session_start();

    // Si hay sesión activa, cogemos el dni del usuario. Si no, creamos uno aleatorio, pues es un usuario anónimo.
    if(isset($_SESSION["dni"])) {
        $dni = $_SESSION["dni"];
        $codcar = "carr" . substr($dni, 5);
    } else {
        $dni = "fhreudiqg";
        $codcar = "carr" . substr($dni, 5);
    }

    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Hacemos la consulta del producto necesitado y guardamos el resultado.
    $consulta = "SELECT productos.nombre, productos.precio, lineacarrito.cantprod FROM productos JOIN lineacarrito ON productos.idprod LIKE lineacarrito.idprod WHERE lineacarrito.idcarrito LIKE '$codcar';";

    $resultado = mysqli_query($conexion, $consulta);
    $filas = mysqli_fetch_all($resultado);

    // Creamos la lista de productos, luego con un array recorremos todos los productos y los guardamos en la lista.
    $listaProductos = array();

    foreach ($filas as $fila) {
        $producto = array("nombre" => $fila[0], "precio" => $fila[1], "cantidad" => $fila[2]);

        array_push($listaProductos, $producto);
    }

    // Devolvemos al frontend la lista de productos.
    echo json_encode($listaProductos);

    // Cerramos la conexión.
    mysqli_close($conexion);
?>