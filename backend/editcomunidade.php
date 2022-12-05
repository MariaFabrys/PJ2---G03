<?php

    require('database.php');

    $id = $_POST["id"];
    $subtitle = $_POST["subtitle"];
    $Publication = $_POST["Publication"];

    try{

        $stmt = $conn->prepare("UPDATE comunidade SET legenda = :legenda, publicacao = :publicacao WHERE id = :id ;");


        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':legenda', $subtitle);
        $stmt->bindParam(':publicacao', $Publication);


        $stmt->execute();

        $count = $stmt->rowCount();

        if($count == 1){
            $result["success"]["message"] = "Editado com sucesso!";

            $result["data"]["id"] = $id;
            $result["data"]["subtitle"] = $subtitle;
            $result["data"]["Publication"] = $Publication;

        }else{
            $result["error"]["message"] = "ID: $id não encontrado!";
        }
       

        header('Content-type text/json');
        echo json_encode($result);

    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    



?>