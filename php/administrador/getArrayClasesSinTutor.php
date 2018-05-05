<?php
    include '../class/conexiones.php';

    $arrayClases = array();

    $bbdd = new Conexion();

    /***** AÑADO LAS CLASES QUE NO TIENEN TUTOR *****/
    $respuesta = $bbdd->consulta("SELECT ID_Clase, Clase FROM clases WHERE Tutor IS NULL ");
    array_push($arrayClases,$respuesta);

    /***** AÑADO LAS TODAS LAS CLASES *****/
    $respuesta2 = $bbdd->consulta("SELECT ID_Clase, Clase FROM clases");
    array_push($arrayClases,$respuesta2);

    /** DEVUELVO UN ARRAY DE ARRAYS.
     ** EN POSICION 0 UN ARRAY CON LAS CLASES SIN TUTOR. EN POSICION 1 UN ARRAY CON LAS TODAS LAS CLASES.
     **/
    echo json_encode($arrayClases);