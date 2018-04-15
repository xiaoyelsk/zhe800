jQuery(function($){

    $('#head').load('../html/head.html');
    $('#footer').load('../html/footer.html');

    let ids = location.search.slice(4,);

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
            let xtu = $('#xtu');

            tname.text(obj.content);
            rname.text(obj.content);
            datu.attr('src',obj.img);
            xtu.attr('src',obj.img);
            xianjia.text('￥' + obj.xianjia);
            yuanjia.text('￥' + obj.yuanjia);

            let gocar = $('#gocar');
            let qty = 0;

            //获取cookie
            let goodlist = Cookie.get('goodlist') || [];

                if(typeof goodlist === 'string'){
                goodlist = JSON.parse(goodlist);
            }

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
            });

            let ity = $('.ity');
            let aa = 0;

            gocar.on('click',function(){
                
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
                                    qty:qty
                                }
                        
                        goodlist.push(goods);

                    aa += 1;
                    console.log(aa);
                    ity.html(aa);
                }

                    document.cookie = 'goodlist='+JSON.stringify(goodlist);


                //飞入购物车动画
                let datu = $('#datu');
                //复制大图节点
                let copydatu = datu.clone();
                
                let acont_l = $('.acont_l');
                //把大图节点写入div
                acont_l.append(copydatu);
                //给copy图片设置样式
                copydatu.css({
                    'position':'absolute',
                    'top':0,
                    'right':100
                });

                //给copy图片设置飞入购物车的动画
                copydatu.animate({width:0,height:0,left:1200},function(){

                copydatu.remove();

                });


            });


            //商品切换
            let qies = $('.qie').find('img');

            $('.qie').on('mouseover','img',function(){

                qies.removeClass('imgcss');

                datu.attr('src',this.src);

                $(this).addClass('imgcss');
            })

        }
    });

    $.ajax({
        type:'get',
        url:'../api/index.php',
        dataType:'json',
        success:function(goods){
            
            //随机商品

            let goodsx = $('.goodsx');
            let arr = [];
            for(let i=0;i<20;i++){
                arr.push(parseInt(Math.random()*21));
            }
                
            let obj = [];

            for(let i=0;i<arr.length;i++){
                obj.push(goods[arr[i]]);
            }

            let ul = $('<ul/>');
            
            ul.html(obj.map(function(item){
                return`<li>
                    <img src="${item.img}" height="173" width="182" >
                    <h6><em>新品上新</em><span>￥${item.xianjia}</span></h6>
                    <p><a href="javascript:;">${item.content}</a></p>
                </li>`
            }));

            goodsx.html(ul);
        }
    })

});