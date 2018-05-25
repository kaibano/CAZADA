<?php
    include '../class/conexiones.php';

    $idClase = $_POST['idClase'];
    $dni = $_POST['dni'];
    $dia = $_POST['dia'];
    $hora = $_POST['hora'];

    $bbdd = new Conexion();

    $res = $bbdd->conectar()->query("UPDATE horarios SET Profesor = '$dni' WHERE Clase = '$idClase' AND Dia = '$dia' AND Hora = '$hora'");

    if($res){
        echo "true";
    }else{
        echo "false";
    }