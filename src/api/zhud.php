<?php
    
    //创建连接
    $conn =  new mysqli('localhost','root','','items');

    $conn->set_charset('utf8');

    $shouji = isset($_GET['shouji']) ? $_GET['shouji'] : null;
    $mima = isset($_GET['mima']) ? $_GET['mima'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;

    if($type === 'type'){

        $sql = "select * from user where shouji='$shouji' and mima='$mima'";

        $den = $conn->query($sql);

        if($den->num_rows>0){
            echo 'ok';
        }else{
            echo 'no';
        }

    }else{
        
        $sql = "select * from user where shouji='$shouji'";

        $res = $conn->query($sql);

        if($res->num_rows>0){
            echo 'no';
        }else{
            if($type === 'reg'){
                $sql = "insert into user(shouji,mima) values('$shouji','$mima')";

                $rot = $conn->query($sql);

                if($rot){
                    echo 'ok';
                }else{
                    echo 'no';
                }
            }else{
                echo 'ok'; 
            }
        }
    }


?>