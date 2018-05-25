<?php
    include "../class/conexiones.php";

    $nombreAsignatura = $_POST['asignatura'];

    $bbdd = new Conexion();
    $conexion = $bbdd->conectar();
    $resultado = $conexion->query("INSERT INTO asignaturas (Nombre) VALUE ('$nombreAsignatura')");
    if($resultado){
        echo "true";
    }else{
        echo "false";
    }
