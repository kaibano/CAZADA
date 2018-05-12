<?php
    include '../class/conexiones.php';

    $id = $_POST['id'];

    $bbdd = new Conexion();
    $bbdd->conectar()->query("UPDATE alumnos SET ID_Clase = NULL WHERE ID_Clase = '$id'");
    $bbdd->conectar()->query("DELETE FROM horarios WHERE Clase = '$id'");
    $bbdd->conectar()->query("UPDATE notas SET ID_Clase = NULL WHERE Id_Clase = '$id'");
    $bbdd->conectar()->query("UPDATE profesores SET Tutoria = NULL WHERE Tutoria = '$id'");
    $resultado = $bbdd->conectar()->query("DELETE FROM clases WHERE ID_Clase = '$id'");
    if($resultado){
        echo "true";
    }else{
        echo "false";
    }