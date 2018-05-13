<?php
    include '../class/conexiones.php';

    $nombreA = ucfirst($_POST['nombreA']);
    $apellidosA = ucwords($_POST['apellidosA']);
    $nombreP = ucfirst($_POST['nombreP']);
    $apellidosP = ucwords($_POST['apellidosP']);
    $dni = strtoupper($_POST['dni']);
    $email = strtolower($_POST['email']);

    $bbdd = new Conexion();
    $query = $bbdd->consulta("SELECT MAX(ID_alumno) as id_alumno FROM alumnos");
    $id_alumno = $query[0]['id_alumno']+1;

    if($nombreA !== "" && $apellidosA !== "" && $nombreP !== "" && $apellidosP !== "" && $dni !== "" && $email !== ""){

        $resultado = $bbdd->consulta("SELECT * FROM alumnos WHERE Padre = '$dni' AND Nombre = '$nombreA' AND Apellidos = '$apellidosA'");
        if(empty($resultado)){
            $resultadoAlumno = $bbdd->conectar()->query("INSERT INTO alumnos (ID_Alumno,Padre,Nombre,Apellidos) VALUES ('$id_alumno','$dni','$nombreA','$apellidosA')");
            $resultadoPadre = $bbdd->conectar()->query("INSERT INTO padres (Usuario, Password, Mail, Nombre, Apellidos, Alumnos) VALUES ('$dni','1234','$email','$nombreP','$apellidosP','$id_alumno')");
            if($resultadoAlumno && $resultadoPadre){
                echo "true";
            }else{
                echo "error";
            }
        }else{
            echo "existe";
        }
    }else{
        echo "vacio";
    }