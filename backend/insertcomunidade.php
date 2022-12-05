<?php

    require('database.php');

    $subtitle = $_POST["subtitle"];
    $Publication = $_POST["Publication"];
   


    try{

        $stmt = $conn->prepare("INSERT INTO comunidade (legenda, publicacao) VALUES (:legenda, :publicacao)");
        $stmt->bindParam(':legenda', $subtitle);
        $stmt->bindParam(':publicacao', $Publication);


        $stmt->execute();
        $id = $conn->lastInsertId();
        
        $result["success"]["message"] = "Cadastro com sucesso!";

        $result["data"]["id"] = $id;
        $result["data"]["subtitle"] = $subtitle;
        $result["data"]["Publication"] = $Publication;


        header('Content-type text/json');
        echo json_encode($result);



    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    



?>