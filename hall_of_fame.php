<?php
require_once 'class/MyPDO.class.php';

$stmt = MyPDO::getInstance()->prepare(<<<SQL
    select nickname, score, date 
    from hall_of_fame
    order by score Desc;
SQL
);

//$stmt->bindValue($_GET["n"], PDO::PARAM_INT);

$stmt->execute();
$allplayer = [];
for($i = 0;$i <$_GET["n"]; $i++){
    $player = $stmt->fetch();
    if(!$player){
    break;
    }
    array_push($allplayer, $player);
}
echo json_encode($allplayer);