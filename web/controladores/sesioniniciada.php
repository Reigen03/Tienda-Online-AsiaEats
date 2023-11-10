<?php
    // Cogemos la sesión activa, si es que hay una.
    session_start();

    /* Miramos si, efectivamente, hay una sesión iniciada. En caso de que sí, se coge la variable
    de sesión que indica el tipo de usuario y se envía ese dato al frontend. */
    if(isset($_SESSION["dni"])) {
        $tipo = $_SESSION["tipo"];
        $nombre = $_SESSION["nombre"];

        echo "$tipo-$nombre";
    } else {
        echo "anonimo-anonimo";
    }
?>