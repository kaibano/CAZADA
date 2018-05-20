
<?php
    include '../class/conexiones.php';

    $id = $_POST['id'];

    $bbdd = new Conexion();
    $del1 = $bbdd->conectar()->query("DELETE FROM alumnos WHERE ID_Alumno = '$id'");
    $del2 = $bbdd->conectar()->query("DELETE FROM faltas WHERE ID_Alumno = '$id'");
    $del3 = $bbdd->conectar()->query("DELETE FROM padres WHERE Alumnos = '$id'");
    $del4 = $bbdd->conectar()->query("DELETE FROM notas WHERE ID_Alumno = '$id'");
    if($del1 && $del2 && $del3 && $del4){
        echo "true";
    }else{
        echo "false";
    }