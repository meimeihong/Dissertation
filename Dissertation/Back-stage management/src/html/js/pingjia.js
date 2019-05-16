
	var page = 1;
	var pagesize = $('#show').val();
	var amount = 0;
	var search = '所有';
	console.log(search);
	function com() {
		pagesize = $('#show').val();
		$('#pingjialist').find('.list').remove();
		pingjialist();
	}
	com();
	function pingjialist() {
		$.ajax({
			type: "post",
			url: server + "/api/allpingjia",
			async: true,
			data: {
				'pagesize': pagesize,
				'page': page,
				'search':search				
			},
			success: function(res) {
				if(res.err == 0) {
					console.log(res);
                    var length = res.data.pinglunlist.length;
                    var data=res.data.pinglunlist;
                    amount = res.data.total; 	
                    var html = ``;
					for(var i = 0; i < length; i++) {
                       if(data[i].res==undefined){
						   var res='';
					   }else{
						   var res=data[i].res;
					   }	
						html += `
                                <ul class="list">
                                    <li>${data[i].UserName}</li>
                                    <li>${data[i].bianhao}</li>
                                    <li  style="width:265px;"> 
                                    <input style="width:265px;border:none;outline:none;height:25px;" type="text" value="${data[i].content}"></li>
                                    <li>${data[i].wuliu}</li>
                                    <li>${data[i].fuwu}</li>
                                    <li>${data[i].zhiliang}</li>
                                    <li>${data[i].haoping}</li>
                                    <li class="time" style="display:none;">${data[i].time}</li>
                                    <li  style="width:265px"> 
                                    <input id="rescont" type="text" value="${res}" style="width:265px;border:none;outline:none;"></li>
                                    <li style="color:blue;cursor: pointer;" class="res">回复</li>
                                </ul>
							    
						        `;
					}
					$('#box #pingjialist').append(html);
					$('#score').text(page + '/' + Math.ceil(amount / pagesize))
				}

			}
		});
	}
	//用户信息查询
	$('#head .search').on('click', function() {
        search=$('#head .int').val();
        page=1;
		console.log(search);
		com();
    })
    //回复评价
    $('#pingjialist').on('click', '.res', function() {
        var content = $(this).parent().find('#rescont').val();
        var time = Number($(this).parent().find('.time').text());
		console.log(content,time)
		if(content!==''){
            $.ajax({
				type: "post",
				url: server + "/api/findpingjia",
				async: true,
				data: {
					'time': time,			
				},
				success: function(res) {
					var data=res.data[0]
					data.res=content;
				   console.log(data);
				   data=JSON.stringify(data)
					$.ajax({
						type: "post",
						url: server + "/api/respingjia",
						async: true,
						data: {
							'data': data,
							'time':time			
						},
						success: function(res) {
							alert(res.msg);
						}
					})
				}
		   })
		}else{
			alert('回复内容为空，请填写回复内容')
		}
		

	});