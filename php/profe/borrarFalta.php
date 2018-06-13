<?php

session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$alum = $_REQUEST['alum'];
$asig = $_REQUEST['asig'];
$fecha = $_REQUEST['fecha'];
$hora = $_REQUEST['hora'];

$ok = $con->borrarFalta($alum, $asig, $fecha, $hora);


echo $ok;
