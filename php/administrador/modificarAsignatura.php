
<?php
    include '../class/conexiones.php';

    $nombre = $_POST['asig'];
    $id = $_POST['id'];

    $bbdd = new Conexion();
    $resultado = $bbdd->consulta("SELECT * FROM asignaturas WHERE Nombre = '$nombre'");

    if(empty($resultado)){
        $conexion = $bbdd->conectar();
        $resultado = $conexion->query("UPDATE asignaturas SET Nombre = '$nombre' WHERE ID_Asig = $id");
        echo "1";
    }else{
        echo "error";
    }
