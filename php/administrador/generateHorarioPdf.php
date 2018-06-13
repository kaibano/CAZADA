<?php
require "../../vendor/autoload.php";

$html = $_GET['html'];

use Dompdf\Dompdf;

$dompdf = new DOMPDF();  //if you use namespaces you may use new \DOMPDF()
$dompdf->loadHtml($html);
$dompdf->render();
$dompdf->stream("sample.pdf", array("Attachment"=>0));