<?php
require 'phpmailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';




$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->CharSet = 'UTF-8';
$mail->isSMTP();
$mail->SMTPAuth   = true;
$mail->IsHTML(true);


$mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
$mail->Username   = 'intonepost@yandex.ru'; // Логин на почте
$mail->Password   = 'zrqmwnhcurcajlpq'; // Пароль на почте
$mail->SMTPSecure = 'ssl';
$mail->Port       = 465;

$mail->setFrom('intonepost@yandex.ru', 'Имя отправителя');
$mail->addAddress('misha48535@gmail.com');

$name =$_POST['name'];
$email =$_POST['email'];
$phone = $_POST['phone'];

$body = "
<h2>Новое письмо</h2>
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br><br>
<b>Телефон:</b><br>$phone";


$mail->isHTML(true);
$mail->Subject = 'письмо с сайта';
$mail->msgHTML($body);

if (!$mail->send()) {
    $message = 'err';
} else {
    $message = 'ok';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);

?>