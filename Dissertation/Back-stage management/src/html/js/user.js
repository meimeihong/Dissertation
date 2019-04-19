
	var page = 1;
	var pagesize = $('#show').val();
	var amount = 0;
	// var sortdown='';
	// var sortup='';
	var search = '所有';
	console.log(search);
	function com() {
		pagesize = $('#show').val();
		$('#userlist').find('.list').remove();
		userlist();
	}
	com();
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
						                <li  style="width:335px;">${data[i].dizhi}</li>
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