<?php
    include "../class/conexiones.php";

    $array = array();
    $id = $_POST['id'];

    $bbdd = new Conexion();
    $con = $bbdd->conectar();
    $res = $con->query("SELECT Nombre, Apellidos FROM 'Profesores'");

        foreach ($res as $fila) {
            array_push($array, $fila);
        }
        echo json_encode($array);


