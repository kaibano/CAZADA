<?php
    include "../class/conexiones.php";

    $nombreAsignatura = $_POST['asig'];

    $bbdd = new Conexion();
    $respuesta = $bbdd->consulta("SELECT * FROM asignaturas WHERE Nombre = '$nombreAsignatura'");

    if(empty($respuesta)) {
        $conexion = $bbdd->conectar();
        $resultado = $conexion->query("INSERT INTO asignaturas (Nombre) VALUE ('$nombreAsignatura')");
        if ($resultado) {
            echo "true";
        } else {
            echo "false";
        }
    }else{
        echo "false";
    }
