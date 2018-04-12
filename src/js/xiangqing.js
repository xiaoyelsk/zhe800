jQuery(function($){

    $('#head').load('../html/head.html');
    $('#footer').load('../html/footer.html');

    let ids = location.search.slice(4,);

    let jia = $('.jia');
    let jian = $('.jian');
    let qt = $('.qt');
    let num = qt.val()*1;

    //绑定点击加减数量按钮
    jia.on('click',function(){
        num++;
        qt.val(num);
    });
    jian.on('click',function(){
     
        if(num<=0){
            num=0;
        }else{
            num--;
        }
            qt.val(num);
    })

    $.ajax({
        type:'get',
        url:'../api/xiangqing.php',
        data:{'id':ids},
        dataType:'json',
        success:function(item){

            let obj = item[0];

            let tname = $('.tname');
            let rname = $('.rname');
            let datu = $('#datu');
            let xianjia = $('.xianjia');
            let yuanjia = $('.yuanjia');

            tname.text(obj.content);
            rname.text(obj.content);
            datu.attr('src',obj.img);
            xianjia.text('￥' + obj.xianjia);
            yuanjia.text('￥' + obj.yuanjia);

            let gocar = $('#gocar');
            let qty = 0;

            let goodlist = Cookie.get('goodlist') || [];

                if(typeof goodlist === 'string'){
                goodlist = JSON.parse(goodlist);
            }

            gocar.on('click',function(){

                let qt = $('.qt');
                
                qty += (qt.val())*1;

                var idx;

                var has = goodlist.some(function(g,i){

                    idx = i;

                    return g.id === obj.id;
                });
                if(has){
                    goodlist[idx].qty = qty;
                }else{

                    let goods = {
                                    id:obj.id,
                                    img:obj.img,
                                    content:obj.content,
                                    yuanjia:obj.yuanjia,
                                    xianjia:obj.xianjia,
                                    time:obj.time,
                                    qty:1
                                }
                        
                        goodlist.push(goods);
                }

                    console.log(goodlist);
                    document.cookie = 'goodlist='+JSON.stringify(goodlist);

            });

        }
    });

});