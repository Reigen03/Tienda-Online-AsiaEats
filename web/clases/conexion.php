<?php
    Class Producto {
        private $db_host = "localhost";
        private $db_nombre = "tienda";
        private $db_usu = "tienda";
        private $db_pass = "tienda";

        // Constructor
        public function __Construct($host, $nombre, $usuario, $password) {
            $this -> db_host = $host;
            $this -> db_usu = $nombre;
            $this -> db_pass = $usuario;
            $this -> db_nombre = $password;
        }

        // Función que recoge los datos de conexión y la establece.
        function realizarConexion() {
            $conexion = mysqli_connect($this -> db_host, $this -> db_usu, $this -> db_pass, $this -> db_nombre);
        }
    }
?>