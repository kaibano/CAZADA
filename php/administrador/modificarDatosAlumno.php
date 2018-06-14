<?php
    include '../class/conexiones.php';
    $nombreA = ucfirst($_POST['nombreA']);
    $apellidosA = ucwords($_POST['apellidosA']);
    $dni = strtoupper($_POST['dni']);
    $nombreP = ucfirst($_POST['nombreP']);
    $apellidosP = ucwords($_POST['apellidosP']);
    $email = strtolower($_POST['email']);
    $id = $_POST['id'];
    $id_clase = $_POST['id_clase'];
    $bbdd = new Conexion();

    if($nombreA !== "" && $apellidosA !== "" && $nombreP !== "" && $apellidosP !== "" && $dni !== "" && $email !== ""){
        $up1 = $bbdd->conectar()->query("UPDATE alumnos SET ID_Clase =  '$id_clase', Padre = '$dni' , Nombre = '$nombreA' , Apellidos = '$apellidosA' WHERE ID_Alumno = '$id'");
        $up2 =$bbdd->conectar()->query("UPDATE padres SET Usuario = '$dni' , Mail = '$email' , Nombre = '$nombreP' , Apellidos = '$apellidosP' WHERE Alumnos = '$id'");
        if($up1 && $up2){
            echo "true";
        }else{
            echo "false";
        }
    }else{
        echo "vacio";
    }