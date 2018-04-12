<?php
    
    //创建连接
    $conn = new mysqli('localhost','root','','items');

    $conn->set_charset('utf8');

    $id = isset($_GET['id']) ? $_GET['id'] : null;

    //查询语句
    $sql = "select * from goodslist where id='$id'";

    //执行查询语句
    $res = $conn->query($sql);

    $rot = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($rot,JSON_UNESCAPED_UNICODE);

?>