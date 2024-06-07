<?php

$connection = null;

try
{
    $connection = new PDO('mysql:host=localhost:3306;dbname=mydb', 'root', '');
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}

catch (PDOException $connectionException)
{
    //Contestamos al cliente que su petición no se puede efectuar por un problema
    $status = array( 'status'=>'db-error','description'=>$connectionException->getMessage() );
    echo json_encode($status);

    //Cortamos la ejecución del programa del servidor de forma forzada
    die();
}

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$client_password = $object->client_password;
$client_username = $object->client_username;

try
{
    $SQLCode = "INSERT INTO usuario( Usuario_Nombre, Usuario_Contraseña, id_tipodeusuario ) VALUES ('$client_username', '$client_password', '1')";
    $connection->query($SQLCode);

    $status = array('status'=>'ok', 'description'=>'Usuario Cliente Creado Satisfactoriamente');
    echo json_encode($status);
}

catch( PDOException $connectionException )
{
    $status = array( 'status' => 'db-error (cliente_crear.php', 'description'=>$connectionException->getMessage() );
    echo json_encode($status);
}

?>