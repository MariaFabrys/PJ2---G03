<?php

    require('database.php');

    $id = $_POST["id"];
    $title = $_POST["title"];
    $description = $_POST["description"];
    $category = $_POST["category"];
    $cover = $_POST["cover"];
    $classification = $_POST["classification"];


    try{

        $stmt = $conn->prepare("UPDATE jogos SET titulo = :titulo, descricao = :descricao, categoria = :categoria, capa = :capa, classificacao = :classificacao WHERE id = :id ;");


        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':titulo', $title);
        $stmt->bindParam(':descricao', $description);
        $stmt->bindParam(':categoria', $category);
        $stmt->bindParam(':capa', $cover);
        $stmt->bindParam(':classificacao', $classification);

        $stmt->execute();

        $count = $stmt->rowCount();

        if($count == 1){
            $result["success"]["message"] = "Editado com sucesso!";

            $result["data"]["id"] = $id;
            $result["data"]["title"] = $title;
            $result["data"]["description"] = $description;
            $result["data"]["category"] = $category;
            $result["data"]["cover"] = $cover;
            $result["data"]["classification"] = $classification;
        }else{
            $result["error"]["message"] = "ID: $id não encontrado!";
        }
       

        header('Content-type text/json');
        echo json_encode($result);

    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    



?>