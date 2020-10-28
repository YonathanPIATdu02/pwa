<?php
require_once 'class/MyPDO.class.php';


//$id = $_GET["id"];
$date = new DateTime("now");
$nickname = $_GET["nickname"];
$score = $_GET["score"];
//$id = 2;


//$score = 10;

//prendre le id max
$stmt = MyPDO::getInstance()->prepare(<<<SQL
    select id ,max(id)
    from hall_of_fame;
    group by id
SQL
);
//var_dump($id);
$stmt->execute();
$id = $stmt->fetch();
//var_dump($id['max(id)']);
$id = intval($id['max(id)']) + 1;
//var_dump($id);




$stmt = MyPDO::getInstance()->prepare(<<<SQL
    insert into hall_of_fame
    value(:id,:date,:nickname,:score);
SQL
);

$stmt->bindValue(':id', $id, PDO::PARAM_INT);
$stmt->bindValue(':date', $date->format('Y-m-d'), PDO::PARAM_STR);
$stmt->bindValue(':nickname', $nickname, PDO::PARAM_STR);
$stmt->bindValue(':score', $score, PDO::PARAM_INT);

$stmt->execute();
echo "bonjour";