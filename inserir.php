<?php

require_once "conexao.php";
$conexao = conectar();

$usuario = json_decode(file_get_contents("php://input"));
$sql = "INSERT INTO livros
        (titulo, categoria, autor)
        VALUES 
        ('$usuario->titulo', 
        '$usuario->categoria',
        '$usuario->autor')";

executarSQL($conexao, $sql); 

$usuario->id = mysqli_insert_id($conexao);
echo json_encode($usuario);
