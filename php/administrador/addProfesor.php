<?php
    include '../class/conexiones.php';

    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $dni = $_POST['dni'];
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $tutor = $_POST['tutor'];
    $sql = '';
    if($tutor === '0'){
        $sql = "INSERT INTO profesores (Usuario, Password, Mail, Nombre, Apellidos, Tutoria) VALUES ('$dni','$pass','$email','$nombre','$apellidos',NULL)";
    }else{
        $sql = "INSERT INTO profesores (Usuario, Password, Mail, Nombre, Apellidos, Tutoria) VALUES ('$dni','$pass','$email','$nombre','$apellidos','$tutor')";
    }
    if($nombre !== "" && $apellidos !== "" && $dni !== "" && $email !== "" && $pass !== ""){

        $bbdd = new Conexion();
        $resultado = $bbdd->consulta("SELECT * FROM profesores WHERE Usuario = '$dni'");
        if(empty($resultado)){
            $resultado = $bbdd->conectar()->query($sql);
            $bbdd->conectar()->query("UPDATE clases SET Tutor = '$dni' WHERE ID_Clase = '$tutor'");
            if($resultado){
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