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
            $nombre = null;
            $ans = $con->query("SELECT Nombre FROM profesores WHERE Usuario = '$tutor'");
            foreach ($ans as $profe) {
                $nombre = $profe;
            }
            if(!empty($clase['Tutor'])) {
                $clase['Tutor'] = $nombre;
            }else{
                $clase['Tutor'] = array('Nombre' => '- -');
            }
            array_push($array, $clase);
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