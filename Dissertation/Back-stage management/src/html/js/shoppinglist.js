    var page = 1;
	var pagesize = $('#show').val();
	var amount = 0;
	// var sortdown='';
	// var sortup='';
	var search = '所有';
	function com() {
		pagesize = $('#show').val();
		$('#shoppinglist').find('.list').remove();
	       shoppinglist();
	}
	com();
	//初始页面数据渲染
	function shoppinglist() {
		$.ajax({
			type: "post",
			url: server + "/api/shoppinglist",
			async: true,
			data: {
				'pagesize': pagesize,
				'page': page,
				// 'sortdown':sortdown,
				// 'sortup':sortup,
				'search':search				
			},
			success: function(res) {
                console.log(res);
				if(res.err == 0) {
					// console.log(res);
					var length = res.data.shoplist.length;
					var data = res.data.shoplist;
                        amount = res.data.total;
                        // console.log(amount)  	
                    var html = ``;
                    var num=res.data.num;
					for(var i = 0; i < length; i++) {
                        var danjia=data[i].data;
                            danjia=JSON.parse(danjia);                           
                        var fahuo="";
                        var dele="";
                        if(data[i].fahuo==2){
                           fahuo="未发货";
                        }else if(data[i].fahuo==3){
                            fahuo="已发货";
                        }else{
                            fahuo="已收货";
                        }
                        if(data[i].delete==0){
                            dele="已删除";
                        }else{
                            dele="未删除";
                        }
                        
                        if(data[i].fahuo==2){
                            html += `
                                    <ul class="list">
						                <li class="user">${data[i].UserName}</li>
						                <li class="bianh">${data[i].bianhao}</li>
                                        <li>${data[i].name}</li>
                                        <li>${danjia.danjia}</li>
                                        <li>${data[i].shuliang}</li>
                                        <li>${fahuo}</li>
                                        <li>${dele}</li>
                                        <li><input class="wei" type="button" value="发货" /></li>
					                </ul>
							
						        `;
                        }else{
                            html += `
                                    <ul class="list">
						                <li class="user">${data[i].UserName}</li>
						                <li class="bianh">${data[i].bianhao}</li>
                                        <li>${data[i].name}</li>
                                        <li>${danjia.danjia}</li>
                                        <li>${data[i].shuliang}</li>
                                        <li>${fahuo}</li>
                                        <li>${dele}</li>
                                        <li><input type="button" value="已发货" disabled="disabled"/></li>
					                </ul>
							
						        `;
                        }
						
					}
					$('#box #shoppinglist').append(html);
                    $('#box #tongji span').text(num);
					$('#score').text(page + '/' + Math.ceil(amount / pagesize))
				}

			}
		});
	}
	
	//信息查询
	$('#shophead .search').on('click', function() {
		search=$('#shophead .int').val();
		console.log(search);
		com();
    })
    $('#box #shoppinglist').on('click', '.wei', function() {
		var user = $(this).parent().parent().find('.user').text();
		var bianh=$(this).parent().parent().find('.bianh').text();;
        console.log(1,user,bianh);
		$.ajax({
            type: "post",
			url: server + "/api/update",
			async: true,
			data: {
				'user': user,
                'bianh':bianh			
			},
			success: function(res){
                console.log(res)
                com();
            }
        })
			// $.post(server + '/api/update', {
            //     'user': user,
            //     'bianh':bianh
			// }, function(res) {
                
			// 	com();
			// });
		

	});
