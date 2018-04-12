jQuery(function($){

    let yan = document.querySelector('.yan');
    let $yan = $('.yan');

    $yan.on('click',function(){
        let yzm = createCode();
        $yan.html(yzm);
    })

    function createCode(){
        var res = '';
        for(var i=0;i<4;i++){
            var num = parseInt(Math.random()*10);
                res+=num;
        }
        return res ;
    }
    let yzm = createCode();

    $yan.html(yzm);

    let $yanzheng = $('#yanzheng');

    $yanzheng.on('blur',function(){
        let $yanz = $yanzheng.val();

        if($yanz != yzm){
            alert('验证码错误！');
            return;
        }
    })

    let $shouji = $('#shouji');

    $shouji.on('blur',function(){

        let num1 = $shouji.val();
        let text = $('#text');
        // 正则手机号
        let reg = /^1[3,4,5,7,8,9]\d{9}$/i;
         if(!reg.test(num1)){
            text.html('手机格式错误！');
            text.css('color','#f00');
            return false;
        }

        $.ajax({
            type:'get',
            url:'../api/zhud.php',
            data:{'shouji':num1},
            dataType:'html',
            success:function(data){
                if(data === 'ok'){
                    text.html('手机号可以使用！');
                    text.css('color','#58bc58');
                }else{
                    text.html('手机号已注册！');
                    text.css('color','#f00');
                }
            }
        });

    });

 
    let $btn = $('.btn');

    $btn.on('click',function(){

        let _psd1 = $('#password').val();
        let _psd2 = $('#passwords').val();
        let reg = /^\S{1,20}$/;
        if(!reg.test(_psd1)){
            alert('请输入密码');
            return false;
        }
        if(!reg.test(_psd2)){
            alert('请再次输入密码');
            return false;
        }
        if(_psd1!=_psd2){
            alert('请输入一致的密码');
            return false;
        }

        // ---------勾选框---------
        let ched = $('#ched').checked;

        if(ched===false){
            alert('请勾选勾选框');
            return false;
        }

        let _shouji = $shouji.val();
        console.log(_shouji);

        let type = 'reg';

        $.ajax({
            type:'get',
            url:'../api/zhud.php',
            data:{'shouji':_shouji,'mima':_psd1,'type':type},
            dataType:'html',
            success:function(data){
                if(data === 'ok'){
                    location.href="../html/denglu.html";
                }else{
                    alert('注册失败！');
                }
            }
        });

    });

});