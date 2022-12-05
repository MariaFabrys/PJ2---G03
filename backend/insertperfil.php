<?php

    require('database.php');

    $photoprofile = $_POST["photoprofile"];
    $nameprofile = $_POST["nameprofile"];
    $biograf = $_POST["biograf"];



    try{

        $stmt = $conn->prepare("INSERT INTO perfil (fotoperfil, nomeperfil, bio) VALUES (:fotoperfil, :nomeperfil, :bio)");
        $stmt->bindParam(':fotoperfil', $photoprofile);
        $stmt->bindParam(':nomeperfil', $nameprofile);
        $stmt->bindParam(':bio', $biograf);


        $stmt->execute();
        $id = $conn->lastInsertId();
        
        $result["success"]["message"] = "Cadastro com sucesso!";

        $result["data"]["id"] = $id;
        $result["data"]["photoprofile"] = $photoprofile;
        $result["data"]["nameprofile"] = $nameprofile;
        $result["data"]["biograf"] = $biograf;


        header('Content-type text/json');
        echo json_encode($result);



    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    



?>