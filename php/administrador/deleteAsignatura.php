<?php
    include '../class/conexiones.php';

    $id = $_POST['asig'];
    $encontrado = false;
    $salir = false;

    $bbdd = new Conexion();
    $resultado = $bbdd->consulta("SELECT Asignatura FROM horarios");

    while (!$encontrado && !$salir){
        for($x = 0 ; $x < count($resultado) ; $x++){
            if($resultado[$x]['Asignatura'] === $id){
                $encontrado = true;
            }
        }
        $salir = true;
    }

    if(!$encontrado){
        $conexion = $bbdd->conectar();
        $resultado = $conexion->query("DELETE FROM asignaturas WHERE ID_Asig = $id");
    }

    echo $encontrado;
