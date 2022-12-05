<?php

    require('database.php');
    
    try{

        $stmt = $conn->prepare("SELECT id, legenda, publicacao FROM comunidade;");
        $stmt->execute();

        $producoes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result["success"]["message"] = "Publicado com sucesso!";
        $result["data"] = $producoes;

        header('Content-type text/json');
        echo json_encode($result);
    

    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    



?>