<?php

    require ('backend/database.php');


    if(isset($_POST["namegame"])&& !empty($_POST["namegame"])){

        $namegame = $_POST["namegame"];
    }
    if(isset($_POST["price"])&& !empty($_POST["price"])){

        $price = $_POST["price"];
    }
    if(isset($_POST["description"])&& !empty($_POST["description"])){

        $description = $_POST["description"];
    }
    if(isset($namegame) && isset($price) && isset($description)){

        $sql = "INSERT INTO jogos( `nomejogo`, `preco`, `descricao`) VALUES ('Jogo1','2.99','aaaaa')";

        $sql = $conn-> query($sql);
    }



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST">
        <label>Nome do jogo:</label>
        <input type="text" name="namegame">
        <label>preço</label>
        <input type="text" name="price">
        <label>Descrição</label>
        <input type="text" name="description">
        <input type="submit">
    </form>

    <?php
            $sql = "SELECT * FROM jogos";
            $sql = $conn-> query($sql);
        
            if($sql->rowCount()>0){
                foreach ($sql->fetchAll() as $produtosSelecionados) {

                    echo $produtosSelecionados['nomejogo'];
                }
            }else{
        
                echo'Não foi';
            }
    
    ?>
</body>
</html>