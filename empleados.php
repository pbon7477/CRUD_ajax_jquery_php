<?php
include('config/conexion.php');
header('Access-Control-Allow-Origin:*');

if($_REQUEST['accion'] == 'leer'){
    $arreglo = array();    
    $sql ='SELECT * FROM empleados';    
    $resultado = $conexion->query($sql);    
    if($resultado){
        while($row = $resultado->fetch_array(MYSQLI_ASSOC)){
            $arreglo[] = $row;
        }        
        echo json_encode($arreglo);
    }
    $resultado->close();
}
else if($_REQUEST['accion'] == 'insertar'){
    $sql = "INSERT INTO empleados (nombre,puesto,edad) VALUES('" . $_POST['nombre'] . "','" . $_POST['puesto'] . "','" . $_POST['edad'] . "')";    
    $resultado = $conexion->query($sql);   
    if($resultado == TRUE){
        echo '1';
    }else{
        echo '0';
    }
} 

else if($_REQUEST['accion'] == 'editar'){
    $sql = "UPDATE empleados
               SET nombre ='" . $_POST['nombre'] . "',
                   puesto ='" . $_POST['puesto'] . "',
                     edad='" . $_POST['edad'] . "'
            WHERE id =" . $_POST['id'] ; 

    $resultado = $conexion->query($sql);
    
    if($resultado == TRUE){
        echo '1';
    }else{
        echo '0';
    }            
}

else if($_REQUEST['accion'] == 'eliminar'){
    $sql = "DELETE FROM empleados WHERE id='" . $_POST['id'] . "';";
    $resultado = $conexion->query($sql);

    if($resultado == true){
        echo '1';
    }
}

$conexion->close();
