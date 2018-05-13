<?php
    include '../class/conexiones.php';

    $bbdd = new Conexion();

    /***** OBTENGO LOS PROFESORES QUE NO TIENEN TUTORIA Y LO ENVIO *****/
    $resultado = $bbdd->consulta("SELECT Usuario,Nombre FROM profesores WHERE Tutoria IS NULL");

    echo json_encode($resultado);