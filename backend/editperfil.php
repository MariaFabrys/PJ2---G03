<?php

    require('database.php');

    $id = $_POST["id"];
    $photoprofile = $_POST["photoprofile"];
    $nameprofile = $_POST["nameprofile"];
    $biograf = $_POST["biograf"];



    try{

        $stmt = $conn->prepare("UPDATE perfil SET fotoperfil = :fotoperfil, nomeperfil = :nomeperfil, bio = :bio WHERE id = :id ;");


        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':fotoperfil', $photoprofile);
        $stmt->bindParam(':nomeperfil', $nameprofile);
        $stmt->bindParam(':bio', $biograf);


        $stmt->execute();

        $count = $stmt->rowCount();

        if($count == 1){
            $result["success"]["message"] = "Editado com sucesso!";

            $result["data"]["id"] = $id;
            $result["data"]["photoprofile"] = $photoprofile;
            $result["data"]["nameprofile"] = $nameprofile;
            $result["data"]["biograf"] = $biograf;

        }else{
            $result["error"]["message"] = "ID: $id não encontrado!";
        }
       

        header('Content-type text/json');
        echo json_encode($result);

    } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    



?>