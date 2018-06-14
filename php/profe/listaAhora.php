<?php

session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$hoy = getdate();
$dia = $hoy['wday'];
$hora = "$hoy[hours]:$hoy[minutes]:$hoy[seconds]";

$busqueda = $con->listaAhora($dia, $hora); //$dia, $hora ---- 1, '12:45:00'

if ($busqueda == 0) {
    echo "NO";
} else {
    $asig = $con->getAsigNom($busqueda['Asignatura']);
    $clase = $con->getClaseNom($busqueda['Clase']);
    $lista = $con->getClase($busqueda['Clase']);
    $fechaHoy = "$hoy[year]-$hoy[mon]-$hoy[mday]";
    $hour = $con->getHora($hora);

    $faltas = $con->getFaltas($busqueda['Asignatura'], $fechaHoy, $hour);

    echo json_encode(array($lista, $asig, $clase, $busqueda['Asignatura'], $faltas));
}
