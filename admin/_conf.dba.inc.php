<?php
$dba = new dba;
$dba->appname = "Stock Knowledge";
$dba->database = "stockknowledge";
$dba->server = "localhost";
$dba->user = "root";
$dba->password = "";
$dba->connect();

$home_url = 'http://localhost/sk/admin';

$loggedin=false;
$usertype=3;
?>
