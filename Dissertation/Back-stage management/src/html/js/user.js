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
	//信息显示条数的限制
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
		$('#userlist').find('.list').remove();
		userlist();
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

	//检索下拉框
	//初始页面数据渲染
	// var search = $('select option:selected').text();
	// console.log(search);
	function userlist() {
		$.ajax({
			type: "post",
			url: server + "/api/user/userlist",
			async: true,
			data: {
				'pagesize': pagesize,
				'page': page,
				// 'sortdown':sortdown,
				// 'sortup':sortup,
				'search':search				
			},
			success: function(res) {
				if(res.err == 0) {
					console.log(res);
					var length = res.data.userlist.length;
					var data = res.data.userlist;
                        amount = res.data.total;
                        console.log(amount)				
					var html = ``;
					for(var i = 0; i < length; i++) {
						html += `
                                    <ul class="list">
						                <li>${data[i].UserName}</li>
						                <li>******</li>
						                <li style="width:250px;">${data[i].Email}</li>
						                <li>${data[i].TelephoneNumber}</li>
					                </ul>
							
						        `;
					}
					$('#box #userlist').append(html);
					// $('.totalgoods').text(amount);
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