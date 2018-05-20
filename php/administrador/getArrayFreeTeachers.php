<?php
    include '../class/conexiones.php';

    $dia = $_POST['dia'];
    $hora = $_POST['hora'];
    $array = array();

    $bbdd = new Conexion();
    $res = $bbdd->conectar()->query("SELECT Usuario FROM profesores WHERE Usuario NOT IN (SELECT Profesor from horarios WHERE Dia = '$dia' and Hora = '$hora')");
    foreach ($res as $profe){
        array_push($array,$profe);
    }
    echo json_encode($array);