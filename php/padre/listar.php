<?php
    include "../class/conexiones.php";

    session_start();

    if(!isset($_SESSION{'usuario'})){
        header("Location: ../../index.php");
    }


    $tabla = $_POST['lista'];
    $array = array();

    $bbdd = new Conexion();
    $con = $bbdd->conectar();
    

    if($tabla === "faltas") {
        $asignaturas = array();
        $final = array();
        $todo = array();
        $resultado = $con->query("SELECT * FROM $tabla WHERE ID_Alumno = ".(int)$_SESSION['usuario']->alumnos);
        while ($fila = $resultado->fetch_array()) {
            array_push($array, $fila);
        }

        $resultado = $con->query("SELECT * FROM asignaturas");
        while ($fila = $resultado->fetch_array()) {
            array_push($asignaturas, $fila);
        }

        for($i = 0; $i < count($array); $i++){
            for($x = 0; $x < count($asignaturas); $x++){
                if($array[$i][1] == $asignaturas[$x][0]){
                    $array[$x][1] =$asignaturas[$x][1];
                }
            }
        }
    }

    if($tabla === "profesores") {
        foreach ($res as $profe){
            $tutoria = $profe['Tutoria'];
            $ans2 = $con->query("SELECT Clase FROM clases WHERE ID_Clase = '$tutoria'")->fetch_array(MYSQLI_NUM);
            if($ans2[0] !== null) {
                $profe['Tutoria'] = $ans2[0];
            }else{
                $profe['Tutoria'] = '-';
            }
            array_push($array,$profe);
        }
    }

    if($tabla === "asignaturas"){
        foreach ($res as $asig){
            array_push($array,$asig);
        }
    }

    echo json_encode($array);
    