<?php
    include '../class/conexiones.php';

    $id = $_POST['id'];

    $bbdd = new Conexion();

    echo json_encode($bbdd->consulta("SELECT * FROM alumnos WHERE ID_Clase = $id"));