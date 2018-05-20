<?php
    include '../class/conexiones.php';

    $id = $_POST['id'];

    $array = array();

    $bbdd = new Conexion();

    $resultado = $bbdd->conectar()->query("SELECT * FROM horarios WHERE Clase = $id");

    foreach ($resultado as $row){
        $arrayRow = array();

        $asig = $row['Asignatura'];
        $row['Asignatura'] = $bbdd->conectar()->query("SELECT ID_Asig,Nombre FROM asignaturas WHERE ID_Asig = '$asig'")->fetch_assoc();

        $prof = $row['Profesor'];
        $row['Profesor'] = $bbdd->conectar()->query("SELECT Usuario,Nombre FROM profesores WHERE Usuario = '$prof'")->fetch_assoc();

        array_push($arrayRow,$row['Dia']);
        array_push($arrayRow,$row['Hora']);
        array_push($arrayRow,$row['Profesor']);
        array_push($arrayRow,$row['Asignatura']);
        array_push($array,$arrayRow);
    }


    echo json_encode($array);