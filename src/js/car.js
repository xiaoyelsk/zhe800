jQuery(function($){

    $('#footer').load('../html/footer.html');

    //获取cookie里的数据
    let goodlist = Cookie.get('goodlist');

            if(goodlist.length === 0){
                goodlist = [];
            }else{
                goodlist = JSON.parse(goodlist)
        }

    //封装数据生成函数
    function shengc(){

        let mcont_c = $('.mcont_c');
        let jia = $('.jia');

        //利用事件委托实现点击加减数量
        mcont_c.on('click','td button',function(){

            let ctr = $(this).closest('tr');

            let cin = ctr.find(':text');

            let csp = ctr.attr('xianjia');

            console.log(csp);

            let num = cin.val();

            if(this.className === 'jia'){
                num++;

                cin.val(num);

                console.log(num)
            }
            if(this.className === 'jie'){
                num--;

                cin.val(num);
            }
        })

        //生成结构
        mcont_c.html(goodlist.map(function(item){


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
                    <td><span class="jine">${item.xianjia * item.qty}</span></td>
                    <td>
                        <span><a href="javascript:;" id="del">删除</a></span><br />
                        <span><a href="javascript:;">移入收藏</a></span>
                    </td>
                    </tr></tbody></table>` 
        }));

                    

    }

    shengc();

        // 删除单个商品
        // 找出cookie中的当前商品，并删除
        // 重新写入cookie

        let mcont_c = $('.mcont_c');

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
        })

})