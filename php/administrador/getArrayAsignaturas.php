<?php
    include '../class/conexiones.php';

    $bbdd = new Conexion();

    echo json_encode($bbdd->consulta("SELECT ID_Asig,Nombre FROM asignaturas"));