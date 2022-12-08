<?php

    require('database.php');

    $title = $_POST["title"];
    $description = $_POST["description"];
    $category = $_POST["category"];
    $cover = $_POST["cover"];
    $classification = $_POST["classification"];

    // echo $title. "<br>";
    // echo $description. "<br>";
    // echo $category. "<br>";
    // echo $cover. "<br>";
    // echo $classification. "<br>";

    try{

        $stmt = $conn->prepare("INSERT INTO jogos (titulo, descricao, categoria, capa, classificacao) VALUES (:titulo, :descricao, :categoria, :capa, :classificacao)");
        $stmt->bindParam(':titulo', $title);
        $stmt->bindParam(':descricao', $description);
        $stmt->bindParam(':categoria', $category);
        $stmt->bindParam(':capa', $cover);
        $stmt->bindParam(':classificacao', $classification);

        $stmt->execute();
        $id = $conn->lastInsertId();
        
        $result["success"]["message"] = "Cadastrado com sucesso!";

        $result["data"]["id"] = $id;
        $result["data"]["title"] = $title;
        $result["data"]["description"] = $description;
        $result["data"]["category"] = $category;
        $result["data"]["cover"] = $cover;
        $result["data"]["classification"] = $classification;

        header('Content-type text/json');
        echo json_encode($result);



    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    



?>