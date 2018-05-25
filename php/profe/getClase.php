<?php
session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$id = $_REQUEST['clase'];

$lista = $con->getClase($id);


echo json_encode($lista);

