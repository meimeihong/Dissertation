//获取管理员账号
var admin= localStorage.getItem("admin");
$('.name').text(admin);
if(admin=='SeniorAdministrator'){
	$('#box #header .hright .zgl').css("display","block");
}else{
	$('#box #header .hright .zgl').css("display","none");
}
//导航栏选择颜色切换
$('#box #header .hright ul').on('click',function(){
    $('#box #header .hright ul').css("background","#448cc7");
       $(this).css("background","#ef3c78");
});
$('#box #header .hright .shouye').on('click',function(){
    window.location.href=('http://localhost:3000/index.html');
});
$('#box #header .hright .back').on('click',function(){
	localStorage.setItem('admin', '');
    window.location.href=('http://localhost:3000/login.html');
});
 function yonghu(){
	window.location.href=('http://localhost:3000/user.html');
 }
 function gouwuche(){
	window.location.href=('http://localhost:3000/shoppingcart.html');
 }
 function gouwu(){
	window.location.href=('http://localhost:3000/shoppinglist.html');
 }
 function guanli(){
	window.location.href=('http://localhost:3000/admin.html');
 }
var server = 'http://127.0.0.1:3000';
	//信息显示条数的限制
	$('#show').on('click', function() {
		var val = $(this).val();
		if(val < 1) {
			$(this).val(1);
		}
		if(val > 15) {
			$(this).val(15);
		}
    });
    $('#show').on('blur', function() {
		var val = $(this).val();
		if(val < 1) {
			$(this).val(1);
		}
		if(val > 15) {
			$(this).val(15);
		}
		com();
	})
	$('#first').on('click', function() {
		page = 1;
		com();
	});
	$('#prev').on('click', function() {
		page -= 1;
		if(page < 1) {
			page = 1;
		}
		com();
    });
    $('#next').on('click', function() {
		page += 1;
		var num = Math.ceil(amount / pagesize);
		if(page > num) {
			page = num;
		}
		com();

	});
	$('#last').on('click', function() {
		page = Math.ceil(amount / pagesize);
		com();
	});
	$('#jump').on('click', function() {
		page = $('#jumppage').val();
		if(page > Math.ceil(amount / pagesize)) {
			page = Math.ceil(amount / pagesize);
			$('#jumppage').val(Math.ceil(amount / pagesize))
		}
		com();
    });
    //按时间排序
    $('#sortdown').on('click',function(){
		sortup='';
		sortdown='sortdown'
		com()
	})
	$('#sortup').on('click',function(){
		sortdown='';
		sortup='sortup'
		com()
	})