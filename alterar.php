<?php

require_once "conexao.php";
$conexao = conectar();

$usuario = json_decode(file_get_contents("php://input"));

$sql = "UPDATE livros SET
        titulo='$usuario->titulo', 
        categoria='$usuario->categoria',
        autor='$usuario->autor',
        WHERE id=$usuario->id";

executarSQL($conexao, $sql);

echo json_encode($usuario);
