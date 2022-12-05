<?php

    require('database.php');
    
    try{

        $stmt = $conn->prepare("SELECT id, titulo, categoria, capa FROM jogos;");
        $stmt->execute();

        $producoes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result["success"]["message"] = "jogo listado com sucesso!";
        $result["data"] = $producoes;

        header('Content-type text/json');
        echo json_encode($result);
    

    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    



?>