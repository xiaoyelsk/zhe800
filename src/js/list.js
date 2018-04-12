jQuery(function($){

    $('#head').load('../html/head.html');
    $('#footer').load('../html/footer.html');

    $.ajax({
        type:'get',
        url:'../api/index.php',
        dataType:'json',
        success:function(data){
            let nancont = $('.nancont');
            console.log(data);
            let datan = data.slice(0,10);
            console.log(datan)
            let tab2 = $('<ul/>');

            tab2.addClass('tab2');

            tab2.html(datan.map(function(item){
                return `<a href="javascript:;"><li guid-id="${item.id}">
                    <img src="${item.img}">
                    <p>${item.content}</p>
                    <span>￥${item.xianjia}</span><del>￥${item.yuanjia}</del>
                    <span>${item.time}</span>
                    <div class="over"><span>包邮</span><span>反积分</span><p>退货补贴优惠卷</p></div>
                    </li></a>`
            }));

            nancont.append(tab2);

            let data2 = document.querySelector('.tab2');
            let lis2 = data2.children;

            chuan(lis2,0);
            console.log(lis2);
            let datav = data.slice(10,20);

            let nvcont = $('.nvcont');

            let tab3 = $('<ul/>');

            tab3.addClass('tab3');

            tab3.html(datav.map(function(item){
                return `<a href="javascript:;"><li guid-id="${item.id}">
                        <img src="${item.img}">
                        <p>${item.content}</p>
                        <span>￥${item.xianjia}</span><del>￥${item.yuanjia}</del>
                        <span>${item.time}</span>
                        <div class="over"><span>包邮</span><span>反积分</span><p>退货补贴优惠卷</p></div>
                        </li></a>`
            }));

            nvcont.append(tab3);

            let data3 = document.querySelector('.tab3');
            let lis3 = data3.children;

            chuan(lis3,10);

            let xiecont = $('.xiecont');

            let tab4 = $('<ul/>');

            tab4.addClass('tab4');

            let datax = data.slice(20,30);
            console.log(datax);

            tab4.html(datax.map(function(item){
                return `<a href="javascript:;"><li guid-id="${item.id}">
                        <img src="${item.img}">
                        <p>${item.content}</p>
                        <span>￥${item.xianjia}</span><del>￥${item.yuanjia}</del>
                        <span>${item.time}</span>
                        <div class="over"><span>包邮</span><span>反积分</span><p>退货补贴优惠卷</p></div>
                        </li></a>`
            }));

            xiecont.append(tab4);

            let data4 = document.querySelector('.tab4');
            let lis4 = data4.children;

            chuan(lis4,20);

            function chuan(lis,s){
                //传参数据
                for(var i=0;i<lis.length;i++){
                    lis[i].id = i + s;
                    lis[i].onclick = function(){

                        let ids = data[this.id].id;

                        console.log(ids);

                        location.href = 'xiangqing.html?id='+ids;   
                    }
                } 
            }

        }
    });

});