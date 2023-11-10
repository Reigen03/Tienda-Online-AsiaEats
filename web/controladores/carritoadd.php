<?php
    // Recogemos del frontend el id y cantidad del producto, pasados a traves del post.
    $id = $_POST["cod"];
    $cantidad = $_POST["cant"];

    // Miramos si hay sesión iniciada, para después asignar un carrito.
    session_start();

    if (isset($_SESSION["dni"])) {
        $dni = $_SESSION["dni"];
    } else {
        $dni = "a" . rand(0, 99999999);
    }

    // Establecemos la conexión a la base de datos.
    $db_host = "localhost";
    $db_nombre = "tienda";
    $db_usu = "tienda";
    $db_pass = "tienda";
    $conexion = mysqli_connect($db_host, $db_usu, $db_pass, $db_nombre);

    // Comprobamos si el usuario tiene carrito. Si no tiene se le crea uno. Si tiene simplemente se obtiene su id.
    $comprobacion = "SELECT EXISTS(SELECT * FROM carrito WHERE dni LIKE '$dni') AS RESULT;";
    $resultado1 = mysqli_query($conexion, $comprobacion);
    $salida1 = mysqli_fetch_row($resultado1);

    if ($salida1[0] == 1) {
        $consulta = "SELECT idcarrito FROM carrito WHERE dni LIKE '$dni';";
        $result = mysqli_query($conexion, $consulta);
        $salida2 = mysqli_fetch_row($result);
        $idcarrito = $salida2[0];
    } else {
        if (!(isset($_SESSION["dni"]))) {
            $usuario = "INSERT INTO usuarios (dni, nombre, correo, pass, administrador) VALUE ('$dni', 'anonimo', 'anonimo', 'anonimo', '0');";
            $insercionUsu = mysqli_query($conexion, $usuario); 
        }

        $idcarrito = "carr" . substr($dni, 5);
        $fecha = date("Y-m-d");
        $creacion = "INSERT INTO carrito (idcarrito, dni, fecha) VALUE ('$idcarrito', '$dni', '$fecha');";
        $result = mysqli_query($conexion, $creacion);
    }

    // Creamos la linea de carrito con el producto y la cantidad de este.
    $insercion = "INSERT INTO lineacarrito (idprod, idcarrito, cantprod) VALUE ('$id', '$idcarrito', '$cantidad');";
    $resultado2 = mysqli_query($conexion, $insercion);

    // Enviamos el resultado al frontend.
    echo $resultado2;

    // Cerramos la conexión.
    mysqli_close($conexion);
?>