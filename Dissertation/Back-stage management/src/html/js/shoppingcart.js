    //获取管理员账号
	//页面渲染和分页
	// var server = 'http://127.0.0.1:3000';
	var page = 1;
	var pagesize = $('#show').val();
	var amount = 0;
	// var sortdown='';
	// var sortup='';
	var search = '所有';
	console.log(search);
	// //信息显示条数的限制
	// $('#show').on('click', function() {
	// 	var val = $(this).val();
	// 	if(val < 1) {
	// 		$(this).val(1);
	// 	}
	// 	if(val > 15) {
	// 		$(this).val(15);
	// 	}
	// });
	function com() {
		pagesize = $('#show').val();
		$('#shoppingcartlist').find('.list').remove();
	       shoppingcartlist();
	}
	com();
	//页面跳转
	// $('#show').on('blur', function() {
    //     var val = $(this).val();
	// 	if(val < 1) {
	// 		$(this).val(1);
	// 	}
	// 	if(val > 15) {
	// 		$(this).val(15);
	// 	}
	// 	com();
	// })
	// $('#pagejump #first').on('click', function() {
	// 	page = 1;
	// 	com();
	// });
	// $('#pagejump #prev').on('click', function() {
	// 	page -= 1;
	// 	if(page < 1) {
	// 		page = 1;
	// 	}
	// 	com();
	// });
	// $('#pagejump #next').on('click', function() {
    //     page += 1;
    //     console.log(page)
	// 	var num = Math.ceil(amount / pagesize);
	// 	if(page > num) {
	// 		page = num;
	// 	}
	// 	com();
	// });
	// $('#pagejump #last').on('click', function() {
	// 	page = Math.ceil(amount / pagesize);
	// 	com();
	// });
	// $('#pagejump #jump').on('click', function() {
	// 	page = $('#pagejump #jumppage').val();
	// 	if(page > Math.ceil(amount / pagesize)) {
	// 		page = Math.ceil(amount / pagesize);
	// 		$('#pagejump #jumppage').val(Math.ceil(amount / pagesize))
	// 	}
	// 	com();
	// });
	//初始页面数据渲染
	function shoppingcartlist() {
		$.ajax({
			type: "post",
			url: server + "/api/cart/shoppingcart",
			async: true,
			data: {
				'pagesize': pagesize,
				'page': page,
				// 'sortdown':sortdown,
				// 'sortup':sortup,
				'search':search				
			},
			success: function(res) {
                // console.log(res);
				if(res.err == 0) {
					// console.log(res);
					var length = res.data.cartlist.length;
					var data = res.data.cartlist;
                        amount = res.data.total;
                        // console.log(amount)  	
                    var html = ``;
                    var num=res.data.num;
					for(var i = 0; i < length; i++) {
                        var danjia=data[i].data;
                            danjia=JSON.parse(danjia);                           
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
                                        <li>${data[i].name}</li>
                                        <li>${danjia.danjia}</li>
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
		search=$('#head .int').val();
		console.log(search);
		com();
	})
