<?php

session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$asig = $_REQUEST['asig'];
$ausentes = json_decode($_REQUEST['ausentes']);
$asistentes = json_decode($_REQUEST['asistentes']);

$hoy = getdate();
$hora = "$hoy[hours]:$hoy[minutes]:$hoy[seconds]";
$numHora = $con->getHora($hora);

$ok = $con->ponerFaltas($ausentes, $asistentes, $asig, $numHora);
echo json_encode($ok);
