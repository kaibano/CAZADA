<?php
    include '../class/conexiones.php';

    $id = $_POST['asig'];
    $encontrado = false;
    $salir = false;

    $bbdd = new Conexion();
    $resultado = $bbdd->consulta("SELECT * FROM clases");

    while (!$encontrado && !$salir){
        for($x = 0 ; $x < count($resultado) ; $x++){
            if(strpos($resultado[$x]['Lunes'],' '.$id.' ') !== false || strpos($resultado[$x]['Martes'],' '.$id.' ') !== false || strpos($resultado[$x]['Miercoles'],' '.$id.' ') !== false || strpos($resultado[$x]['Jueves'],' '.$id.' ') !== false || strpos($resultado[$x]['Viernes'],' '.$id.' ') !== false){
                $encontrado = true;
            }
            if(strpos($resultado[$x]['Lunes'],$id.' ') !== false || strpos($resultado[$x]['Martes'],$id.' ') !== false || strpos($resultado[$x]['Miercoles'],$id.' ') !== false || strpos($resultado[$x]['Jueves'],$id.' ') !== false || strpos($resultado[$x]['Viernes'],$id.' ') !== false){
                $encontrado = true;
            }
            if(strpos($resultado[$x]['Lunes'],' '.$id) !== false || strpos($resultado[$x]['Martes'],' '.$id) !== false || strpos($resultado[$x]['Miercoles'],' '.$id) !== false || strpos($resultado[$x]['Jueves'],' '.$id) !== false || strpos($resultado[$x]['Viernes'],' '.$id) !== false){
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
