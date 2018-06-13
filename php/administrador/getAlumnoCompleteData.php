<?php
    include '../class/conexiones.php';
    include  '../class/padre.php';

    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $arrayAlumno = array();

    $bbdd =  new Conexion();

    $padre = $bbdd->conectar()->query("SELECT Padre FROM alumnos WHERE ID_Alumno = '$id'")->fetch_assoc()['Padre'];

    $dataPadre = $bbdd->conectar()->query("SELECT * FROM padres WHERE Usuario = '$padre'")->fetch_assoc();

    array_push($arrayAlumno,$nombre);
    array_push($arrayAlumno,$apellidos);
    array_push($arrayAlumno,$dataPadre);

    echo json_encode($arrayAlumno);