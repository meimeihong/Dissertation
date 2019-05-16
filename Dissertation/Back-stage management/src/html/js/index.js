
	var server = 'http://127.0.0.1:3000';
	var page = 1;
	var pagesize = $('#show').val();
	var amount = 0;
	var sortdown='';
	var sortup='';
	var search = '所有';
	function com() {
		pagesize = $('#show').val();
		$('#goods').find('.goodsl').remove();
		$('#checkall').prop('checked', false);
		goodslist();
	}
	com();
	function goodslist() {
		$.ajax({
			type: "post",
			url: server + "/api/goods/goodslist",
			async: true,
			data: {
				'pagesize': pagesize,
				'page': page,
				'sortdown':sortdown,
				'sortup':sortup,
				'leibie':search,
			},
			success: function(res) {
				if(res.err == 0) {
					console.log(res);
					var length = res.data.goodslist.length;
					var data = res.data.goodslist;
					amount = res.data.total;
					
					var html = ``;
					for(var i = 0; i < length; i++) {
						var time=Number(data[i].NewTime);
						var times=new Date(time);
						var nowimg=data[i].img.split(',')[0];
						console.log(nowimg);
						var year=times.getFullYear();
						var month=times.getMonth();
						var dates=times.getDate();
						var hours=times.getHours() ;
						var minutes=times.getMinutes();
						var second=times.getSeconds() 
						var timess=year+'/'+month+'/'+dates+'--'+hours+':'+minutes+':'+second;
						html += `
							<ul class="goodsl">
								<li><input type="checkbox" name="" id="checko" value="" /></li>
								<li id="goodsid">${data[i].bianhao}</li>
								<li>${data[i].name}</li>
								<li style="width:250px;">${data[i].miaoshu}</li>
								<li>${data[i].danjia}</li>
								<li>${data[i].jiangjia}</li>
								<li>${data[i].shuliang}</li>
								<li>${data[i].guige}</li>
								<li>${data[i].leibie}</li>
								<li>${data[i].xiaoleibie}</li>
								<li>${data[i].zhuangt}</li>
								<li style="width:150px;">${timess}</li>
								<li class="cz"><span class="alter">修改</span>   <span class="del">删除</span></li>
							</ul>
							
						`;
					}
					$('#box #goods').append(html);
					$('.totalgoods').text(amount);
					$('#score').text(page + '/' + Math.ceil(amount / pagesize))
				}

			}
		});
	}
	
	//商品查询
	$('#head #search').on('click', function() {
		page=1;
		search=$('#hptext').val();
		console.log(search);
		com();
	})
	//进入添加商品页面
	$('#box #head .hp .span1').on('click', function() {
		// window.open('http://localhost:3000/add.html');
		window.location.href=('http://localhost:3000/add.html');
		console.log('q');
	});
	//进入修改商品页面
	$('#goods').on('click', '.alter', function() {
		var id = $(this).parent().parent().find('#goodsid').text();
		localStorage.setItem('updateid', id);
		window.location.href=('http://localhost:3000/alter.html');
	});
	//删除单个商品
	$('#goods').on('click', '.del', function() {
		var id = $(this).parent().parent().find('#goodsid').text();
		var that = $(this);
		if(confirm('您确定要删除吗？')) {
			$.post(server + '/api/goods/goodsdelete', {
				'id': id
			}, function(res) {
				com();
			});
		}

	});
	//全选
	$('#checkall').on('click', function() {
		checkall();
	});

	function checkall() {
		$checkall = $('#checkall').prop('checked');
		if($checkall) {
			$('#goods .goodsl #checko').prop('checked', 'checked');
		} else {
			$('#goods .goodsl #checko').prop("checked", false);
		}
	}
	//商品列表每选中一项把数据存入数组中
	function check() {
		var arr = [];
		for(var i = $('#goods').find('.goodsl #checko').length - 1; i >= 0; i--) {
			if($('#goods .goodsl #checko').eq(i).prop('checked')) {
				arr.push(i);
			}
		}
		return arr;
	}
	//根据数组的长度判断是否全部选中
	function allcheck(arr) {
		if(arr.length == $('#goods').find('.goodsl #checko').length) {
			$('#checkall').prop('checked', 'checked');
		} else {
			$('#checkall').prop("checked", false);
		}
	}
	$('#goods').on('click', '.goodsl #checko', function() {
		var arr = check();
		allcheck(arr);
	});
	//把选中的商品的id存入数组中
	function checkdel() {
		var ids = [];
		for(var i = $('#goods').find('.goodsl #checko').length - 1; i >= 0; i--) {
			if($('#goods .goodsl #checko').eq(i).prop('checked')) {
				var id = $('#goods .goodsl #checko').eq(i).parent().parent().find('#goodsid').html();
				console.log(id)
				ids.push(id);
			}
		}
		return ids;
	}
	//删除选中的商品
	$('#head .span2').on('click', function() {
		var ids = checkdel();
		if(ids.length > 0) {
			var data = {};
			for(var i in ids) {
				data[i] = ids[i]
			}
			console.log(data);
			$.post('http://localhost:3000/api/goods/checkdel', data, function(res) {
				alert(res.msg);
				com();
			});
		} else {
			alert('请选中要删除的商品');
		}

	})