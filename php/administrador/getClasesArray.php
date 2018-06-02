<?php
    include '../class/conexiones.php';

    $arrayClases = array();

    $bbdd = new Conexion();

    echo json_encode($bbdd->consulta("SELECT ID_Clase, Clase FROM clases ORDER BY Clase"));