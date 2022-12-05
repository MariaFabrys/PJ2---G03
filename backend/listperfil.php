<?php

    require('database.php');
    
    try{

        $stmt = $conn->prepare("SELECT id, fotoperfil, nomeperfil, bio FROM perfil;");
        $stmt->execute();

        $producoes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result["success"]["message"] = "perfil listado com sucesso!";
        $result["data"] = $producoes;

        header('Content-type text/json');
        echo json_encode($result);
    

    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    



?>