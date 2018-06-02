
<?php
    include '../class/conexiones.php';

    $bbdd = new Conexion();
    echo json_encode($bbdd->consulta("SELECT COUNT(ID_Alumno) as num FROM alumnos WHERE ID_Clase is NULL"));