<?php
require 'phpmailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';




$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->CharSet = 'UTF-8';
$mail->isSMTP();
$mail->SMTPAuth   = true;
//$mail->setLanguage ('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//$mail->setFrom('mae55191@eoopy.com','');//дописать
//$mail->addAddress('feyok64817@edultry.com')//дописать
//$mail->Subject = "Форма с сайта";
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


//$body.=$_POST['email'];
//$body.=$_POST['phone'];

$mail->isHTML(true);
$mail->Subject = 'письмо с сайта';
//$mail->Body = $body;
$mail->msgHTML($body);

if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);

//echo json_encode($_POST);

//$name = $_POST['name'];
//$email = $_POST['email'];
//$phone = $_POST['phone'];

//$name = htmlspecialchars($name);
//$email = htmlspecialchars($email);
//$phone = htmlspecialchars($phone);

//$name = urldecode($name);
//$email = urldecode($email);
//$phone = urldecode($phone);

//$name = trim($name);
//$email = trim($email);
//$phone = trim($phone);
//echo $fio;
//echo "<br>";
//echo $email;
//if (mail("mae55191@eoopy.com", "Заявка с сайта", "ФИО:".$name."E-mail: ".$email."Phone".$phone ))
// {
 //   echo json_encode("сообщение успешно отправлено");
 //} else {
 //   echo json_encode("Ошибка");
// }
?>