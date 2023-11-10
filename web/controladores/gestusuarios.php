<?php
    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Realizamos la consulta de todos los usuarios.
    $consulta = "SELECT dni, nombre, correo, administrador FROM usuarios;";
    $resultados = mysqli_query($conexion, $consulta);
    $filas = mysqli_fetch_all($resultados);

    // Cerramos la conexión.
    mysqli_close($conexion);

    /* Creamos un array, que guardará los usuarios. Luego recorremos los resultados de la consulta y por
    cada registro creamos un array de usuario con sus datos. Cada array de usuario lo añadimos al array
    de la lista y esa lista la convertimos a json, para poder enviarselo al frontend. */
    $listaUsuarios = array();

    foreach ($filas as $fila) {
        $usuario = array("dni" => $fila[0], "nombre" => $fila[1], "correo" => $fila[2], "admin" => $fila[3]);

        array_push($listaUsuarios, $usuario);
    }

    echo json_encode($listaUsuarios);
?>