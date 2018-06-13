<?php
include "../phpmailer/class.phpmailer.php";
include "../phpmailer/class.smtp.php";

$body = $_POST['mensaje'];
$address_to = $_POST['mailTo'];
$the_subject = $_POST['asunto'];


$email_user = "cazadaDaw@gmail.com";//aqui el usuario de la cuenta de correo
$email_password = "cazada12345";//aqui la contraseña de la cuenta de correo
$from_name = "Alias(alias)";//aqui el alias que sustituye al correo
$phpmailer = new PHPMailer();

// ---------- datos de la cuenta de Gmail -------------------------------
$phpmailer->Username = $email_user;
$phpmailer->Password = $email_password;
//-----------------------------------------------------------------------
//$phpmailer->SMTPDebug = 4;
$phpmailer->SMTPSecure = 'tsl';
$phpmailer->Host = "smtp.gmail.com"; // GMail
$phpmailer->Port = 587;
$phpmailer->IsSMTP(); // use SMTP
$phpmailer->SMTPAuth = true;

$phpmailer->setFrom("cazadaDaw@gmail.com","INSTITUTO");//email que uso para mandar y el alias
$phpmailer->AddAddress($address_to); // recipients email
//$phpmailer->addBCC("email de copia oculta");

$phpmailer->Subject = $the_subject;
$phpmailer->Body .=$body;

$phpmailer->IsHTML(true);

if($phpmailer->Send()){
    echo "true";
    header ("Location: ../index/profe.php");
}else{
    echo "false";
    print_r($phpmailer->ErrorInfo);die;
}
?>

