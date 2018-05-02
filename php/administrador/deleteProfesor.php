<?php
    include '../class/conexiones.php';

    $id = $_POST['id'];

    $bbdd = new Conexion();
    $bbdd->conectar()->query("UPDATE clases SET Tutor = NULL WHERE Tutor = '$id'");
    $bbdd->conectar()->query("UPDATE horarios SET Profesor = NULL WHERE Profesor = '$id'");
    $resultado = $bbdd->conectar()->query("DELETE FROM profesores WHERE Usuario = '$id'");
    if($resultado){
        echo "true";
    }else{
        echo "false";
    }