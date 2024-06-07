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

?>