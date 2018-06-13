<?php

session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$alum = $_REQUEST['alum'];
$asig = json_decode($_REQUEST['asig']);

$faltas = $con->getTotalFaltas($alum, $asig);
if (count($faltas)) {
    foreach ($faltas as $indice => $f) {
        $aux[$indice] = $f['Fecha'];
    }
    array_multisort($aux, SORT_ASC, $faltas);
}

echo json_encode($faltas);
