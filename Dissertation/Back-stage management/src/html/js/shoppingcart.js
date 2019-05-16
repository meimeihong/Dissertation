
	var page = 1;
	var pagesize = $('#show').val();
	var amount = 0;
	var search = '所有';
	console.log(search);
	function com() {
		pagesize = $('#show').val();
		$('#shoppingcartlist').find('.list').remove();
	       shoppingcartlist();
	}
	com();
	
	//初始页面数据渲染
	function shoppingcartlist() {
		$.ajax({
			type: "post",
			url: server + "/api/cart/shoppingcart",
			async: true,
			data: {
				'pagesize': pagesize,
				'page': page,
				'search':search				
			},
			success: function(res) {
                // console.log(res);
				if(res.err == 0) {
					console.log(res);
					var length = res.data.cartlist.length;
					var data = res.data.cartlist;
                        amount = res.data.total;
                        // console.log(amount)  	
                    var html = ``;
                    var num=res.data.num;
					for(var i = 0; i < length; i++) {
						var goodone=JSON.parse(data[i].data);
                        var danjia=goodone.danjia;
                            // danjia=JSON.parse(danjia);                           
                        var dele="";
                        if(data[i].delete==1){
                           dele="已添加";
                        }else{
                            dele="已移除";
                        }
						html += `
                                    <ul class="list">
						                <li>${data[i].UserName}</li>
						                <li>${data[i].bianhao}</li>
                                        <li>${goodone.name}</li>
                                        <li>${danjia}</li>
                                        <li>${data[i].addnumber}</li>
                                        <li>${dele}</li>
					                </ul>
							
						        `;
					}
					$('#box #shoppingcartlist').append(html);
                    $('#box #tongji span').text(num);
					$('#score').text(page + '/' + Math.ceil(amount / pagesize))
				}

			}
		});
	}
	
	//用户信息查询
	$('#head .search').on('click', function() {
		page=1;
		search=$('#head .int').val();
		console.log(search);
		com();
	})
