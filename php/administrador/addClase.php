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
                $idClase = $bbdd->conectar()->query("SELECT MAX(ID_Clase) FROM clases")->fetch_array();
                for($x = 1 ; $x <= 5 ; $x++){
                    for($y = 1 ; $y <= 6 ; $y++){
                        $bbdd->conectar()->query("INSERT INTO horarios (Clase,Dia,Hora) VALUES ('$idClase[0]','$x','$y')");
                    }
                }
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