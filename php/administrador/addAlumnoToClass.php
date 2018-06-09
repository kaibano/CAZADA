<?php
    include '../class/conexiones.php';

    $array = json_decode($_POST['alum']);

    if(empty($array)) {
        echo "vacio";
    }else {
        $bbdd = new Conexion();

        foreach ($array as $alum) {
            $res = $bbdd->conectar()->query("UPDATE alumnos SET ID_Clase = '$alum[1]' WHERE ID_Alumno = '$alum[0]'");
            if (!$res) {
                echo "error";
            }
        }
        echo "true";
    }
