<?php
    include '../class/conexiones.php';

    $bbdd = new Conexion();

    echo json_encode($bbdd->consulta("SELECT * FROM alumnos WHERE ID_Clase IS NULL"));