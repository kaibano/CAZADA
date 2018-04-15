<?php
    include "../class/conexiones.php";

    $tabla = $_POST['lista'];
    $array = array();

    $bbdd = new Conexion();
    $con = $bbdd->conectar();
    $res = $con->query("SELECT * FROM $tabla");

    foreach ($res as $fila){
        array_push($array,$fila);
    }

    echo json_encode($array);