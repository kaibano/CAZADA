<?php
    include '../class/conexiones.php';

    $numero = $_POST['numero'];
    $letra = $_POST['letra'];
    $modal = $_POST['modal'];

    if($numero !== "" && $letra !== "0" && $modal !== "-"){

        $bbdd = new Conexion();
        $clase = $numero.$letra.' - '.$modal;
        $resultado = $bbdd->consulta("SELECT * FROM clases WHERE Clase = '$clase'");
        if(empty($resultado)){
            $result = $bbdd->conectar()->query("INSERT INTO clases (Tutor, Clase) VALUES (NULL,'$clase')");
            if($result){
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