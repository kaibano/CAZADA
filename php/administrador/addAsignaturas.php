<?php
    include "../class/conexiones.php";

    $nombreAsignatura = $_POST['asig'];

    $bbdd = new Conexion();
    $conexion = $bbdd->conectar();
    if($nombreAsignatura === ""){
        echo "vacio";
    }else {
        $res1 = $bbdd->consulta("SELECT * FROM asignaturas WHERE Nombre = '$nombreAsignatura'");
        if(empty($res1)) {
            $resultado = $conexion->query("INSERT INTO asignaturas (Nombre) VALUE ('$nombreAsignatura')");
            if ($resultado) {
                echo "true";
            }
        }else{
            echo "existe";
        }
    }
