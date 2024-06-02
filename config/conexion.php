<?php 

include('config.php');

$conexion = new mysqli($db_host,$db_user, $db_pass, $db_name);

if($conexion->connect_error){
    echo 'Error en la conexion: <br>' . $conexion->connect_errno;
}

$conexion->set_charset('utf8');


if($conexion->errno){
    die($conexion->error);
}

