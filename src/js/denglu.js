jQuery(function($){

    let $btn = $('#btn');

    $btn.on('click',function(){

        let $shouji = $('.ren').val();
        let $mima = $('.suo').val();
        let $type = 'type';
        $.ajax({
            type:'get',
            url:'../api/zhud.php',
            data:{'shouji':$shouji,'mima':$mima,'type':$type},
            dataType:'html',
            success:function(data){
                if(data === 'ok'){
                    location.href='../index.html';
                }else{
                    alert('手机或密码错误！');
                }
            }
        })

    });

});