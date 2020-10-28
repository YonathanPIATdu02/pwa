<?php
require_once('class/MyPDO.class.php');

$date = new DateTime("now");

/*
$stmt = MyPDO::getInstance()->prepare(<<<SQL
    insert into hall_of_fame
    value(1,:date,'yoyo',100);
SQL
);

$stmt->bindValue(':date', $date->format('Y-m-d'), PDO::PARAM_STR);

$stmt->execute();
*/
$select = MyPDO::getInstance()->prepare(<<<SQL
    select id
    from hall_of_fame
    group by id
    having max(id);
SQL
);

$select->execute();
$id = $select->fetch();
$id = intval($id) + 1;
var_dump($id);