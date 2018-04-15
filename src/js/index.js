jQuery(function($){
    $('#head').load('../html/head.html');
    $('#footer').load('../html/footer.html');
    $.ajax({
        type:'get',
        url:'../api/index.php',
        dataType:'json',
        success:function(data){
            let mcont_b = $('.mcont_b');

            let tab2 = $('<ul/>');

            tab2.addClass('tab2');

            tab2.html(data.map(function(item){
                return `<a href="javascript:;"><li>
                    <img src="${item.img}">
                    <span>￥${item.xianjia}</span>
                    <p>${item.content}</p>
                    </li></a>`
            }));

            mcont_b.append(tab2);
            let bum = 0;
            let bun = 0;
            //给左边按钮绑定事件
            $('#zuo').on('click',function(){
                if(bun <= 0){
                    bun = 4327;
                    tab2.animate({left:-4327});
                }else{
                    tab2.animate({left:-bun});
                }
                bun -= 1078;

            })
            $('#you').on('click',function(){
                if(bum < -3247){
                    bum =0;
                    tab2.animate({left:0})
                }else{
                    bum -= 1080;
                }
                tab2.animate({left:bum});
            })

            let data1 = document.querySelector('.tab2');
            let lis2 = data1.children;

            chuan(lis2);

            //封装传参数据函数
            function chuan(lis){
                //传参数据
                for(let i=0;i<lis.length;i++){
                    lis[i].id = i;
                    lis[i].onclick = function(){

                        let ids = data[this.id].id;

                        location.href = 'html/xiangqing.html?id='+ids;   
                    }
                } 
            }

            let gcont_b = $('.gcont_b');

            let tab3 = $('<ul/>');

            tab3.addClass('tab3');

            tab3.html(data.map(function(item){
                return `<li><a href="javascript:;">
                        <img src="${item.img}">
                        <p>${item.content}</p>
                        <span>￥${item.xianjia}</span><del>￥${item.yuanjia}</del>
                        <span>${item.time}</span>
                        </a></li>`
            })); 

            gcont_b.append(tab3);

            let data2 = document.querySelector('.tab3');
            let lis = data2.children;

            chuan(lis);

        }


    });


});