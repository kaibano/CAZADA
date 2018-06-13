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
                    $array[$i][1] = $asignaturas[$x][1];
                }
            }
        }
    }

    if($tabla === "notas") {
        $asignaturas = array();
        $numero = array();
        $final = array();
        $todo = array();
        $resultado = $con->query("SELECT * FROM $tabla WHERE ID_Alumno = ".(int)$_SESSION['usuario']->alumnos." order by ID_Asig,Evaluacion");
        while ($fila = $resultado->fetch_array()) {
            array_push($array, $fila);
        }

        $resultado = $con->query("SELECT * FROM asignaturas");
        while ($fila = $resultado->fetch_array()) {
            array_push($asignaturas, $fila);
        }

        for($i = 0; $i < count($array); $i++){
            for($x = 0; $x < count($asignaturas); $x++){
                if($array[$i][2] == $asignaturas[$x][0]){
                    $array[$i][2] = $asignaturas[$x][1];
                }
            }
        }

        $asig = "";
        $aux = array();
        $total = array();
        $contador = 0;

        foreach($array as $x){
            if($x[2] != $asig){
                if ($contador == 1){
                    array_push($aux,'-');
                    $contador ++;
                } 
                if ($contador == 2){
                    array_push($aux,'-');
                    $contador ++;
                }
                if ($contador == 3){
                    array_push($total,$aux);
                    $aux = array();
                }
                $contador = 1;
                $asig = $x[2];
                array_push($aux,$asig);
                array_push($aux,$x[4]);
            }else{
                $contador ++;
                array_push($aux,$x[4]);
            }


        }




    }


     echo json_encode($aux);
