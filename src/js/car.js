jQuery(function($){

    $('#footer').load('../html/footer.html');

    //获取cookie里的数据
    let goodlist = Cookie.get('goodlist');

            if(goodlist.length === 0){
                goodlist = [];
            }else{
                goodlist = JSON.parse(goodlist)
        }

    let mcont_c = $('.mcont_c');
    let total = 0;

    //封装数据生成函数
    function shengc(){

        //生成结构
        mcont_c.html(goodlist.map(function(item){

            total = (item.xianjia * item.qty).toFixed(2);

            return `<table class="tble"><tbody><tr class="${item.id}">
                    <td><input type="checkbox" class="cbox"></td>
                    <td>
                        <img src="${item.img}" />
                        <p><a href="javascript:;">${item.content}</a></p>
                        <p class="time">${item.time}
                    </td>
                    <td>
                        <span class="xianjia">${item.xianjia}</span><br />
                        <del class="yuanjia">${item.yuanjia}</del>
                    </td>
                    <td>
                        <button class="jie">-</button>
                        <input type="text" id="shu" value="${item.qty}"/>
                        <button class="jia">+</button>
                    </td>
                    <td><span class="jine">${total}</span></td>
                    <td>
                        <span><a href="javascript:;" id="del">删除</a></span><br />
                        <span><a href="javascript:;">移入收藏</a></span>
                    </td>
                    </tr></tbody></table>` 
        }));

                    

    }

    shengc();
  
    //利用事件委托实现点击加减数量
        mcont_c.on('click','td button',function(){

            let ctr = $(this).closest('tr');

            let guid = ctr.attr('class');

            for(let i=0;i<goodlist.length;i++){
                if(goodlist[i].id === guid){

                    if(this.className === 'jia'){
                        goodlist[i].qty++;
                    }
                    if(this.className === 'jie'){
                        if(goodlist[i].qty <= 0){
                            goodlist[i].qty = 0; 
                        }else{

                            goodlist[i].qty--;
                        }
                    }

                    break;
                }
            }
            Cookie.set('goodlist',JSON.stringify(goodlist));

            shengc();
            
        });

        let iqty = $('.iqty');
        let zongshu = $('.zongshu');
        let iq = 0;
        let zonge = 0;

        //结算
        mcont_c.on('click','td input',function(){

            let ctr = $(this).closest('tr');

            let ctable = $(this).closest('table');

            let guid = ctr.attr('class');

            if($(this)[0].checked){ 

                ctable.addClass('tclas');                              

                for(let i=0;i<goodlist.length;i++){

                    if(goodlist[i].id === guid){
                        iq += goodlist[i].qty;
                        zonge += goodlist[i].xianjia * goodlist[i].qty;

                        iqty.html(iq);
                        zongshu.html('￥'+zonge);
                    }

                }

            }else{

                for(let i=0;i<goodlist.length;i++){

                    if(goodlist[i].id === guid){
                        iq -= goodlist[i].qty;
                        zonge -= goodlist[i].xianjia * goodlist[i].qty;

                        iqty.html(iq);
                        zongshu.html('￥'+zonge);
                    }

                }

                ctable.removeClass('tclas');
            }

        });

        //全选
        let che = $('#che');
        let checkboxs = mcont_c.find(':checkbox');
        let tables = mcont_c.children('table');

        che.on('click',function(){

            checkboxs.prop('checked',this.checked);

            tables[this.checked ? 'addClass' : 'removeClass']('tclas');
        })

        // 删除单个商品
        // 找出cookie中的当前商品，并删除
        // 重新写入cookie

        mcont_c.on('click','td #del',function(){

            let ctr = $(this).closest('tr');

            let id = ctr.attr('class');

            for(let i=0;i<goodlist.length;i++){
                if(goodlist[i].id === id){
                    goodlist.splice(i,1);

                    break;
                }
            }

            Cookie.set('goodlist',JSON.stringify(goodlist));

            shengc();
        });


    $.ajax({
    type:'get',
    url:'../api/index.php',
    dataType:'json',
    success:function(goods){
        
            //随机商品

            let sgoods = $('.sgoods');
            let arr = [];
            for(let i=0;i<10;i++){
                arr.push(parseInt(Math.random()*11));
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

            sgoods.html(ul);
        }
    })

})