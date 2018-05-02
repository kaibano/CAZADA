<?php
    include "../class/conexiones.php";

    $tabla = $_POST['lista'];
    $array = array();

    $bbdd = new Conexion();
    $con = $bbdd->conectar();
    $res = $con->query("SELECT * FROM $tabla");

    if($tabla === "clases") {
        foreach ($res as $clase) {
            $tutor = $clase['Tutor'];
            $nombreCompleto = array();
            $ans = $con->query("SELECT Nombre,Apellidos FROM `profesores` WHERE Usuario = '$tutor'");
            foreach ($ans as $parte) {
                array_push($nombreCompleto, $parte);
            }
            if(!empty($clase['Tutor'])) {
                $clase['Tutor'] = $nombreCompleto;
            }else{
                $clase['Tutor'] = array(array("Nombre"=>"-","Apellidos"=>"-"));
            }
            array_push($array, $clase);
        }
    }

    if($tabla === "profesores") {
        foreach ($res as $profe){
            $tutoria = $profe['Tutoria'];
            $ans2 = $con->query("SELECT Clase FROM `clases` WHERE ID_Clase = '$tutoria'")->fetch_array(MYSQLI_NUM);
            $profe['Tutoria'] = $ans2[0];

            $clases = explode(" ",$profe['Clases']);
            $arrayClases = array();
            foreach ($clases as $clase){
                $ans3 = $con->query("SELECT Clase FROM `clases` WHERE ID_Clase = '$clase'")->fetch_array(MYSQLI_NUM);
                array_push($arrayClases,$ans3[0]);
            }
            $profe['Clases'] = $arrayClases;

            array_push($array,$profe);
        }
    }

    if($tabla === "asignaturas"){
        foreach ($res as $asig){
            array_push($array,$asig);
        }
    }

    echo json_encode($array);