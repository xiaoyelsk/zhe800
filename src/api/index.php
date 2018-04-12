<?php
    
    //创建连接
    $conn = new mysqli('localhost','root','','items');

    $conn->set_charset('utf8');

    $sql = "select * from goodslist";

    $res = $conn->query($sql);

    $rot = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($rot,JSON_UNESCAPED_UNICODE);

?>