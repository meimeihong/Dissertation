var server = 'http://127.0.0.1:3000';
	var id = localStorage.getItem("updateid");
	var imgs=[];
	var imgstr=null;
	console.log(id)

	//初始更新页面
	$.post(server + "/api/goods/update", {
		'id': id
	}, function(res) {
		var data = res.data[0];
		var img=data.img.split(',');
		    imgs=img
		console.log(img);
		$('#bianhao').val(data.bianhao);
		$('#name').val(data.name);
		$('#leibie').val(data.leibie);
		$('#xiaoleibie').val(data.xiaoleibie);
		$('#guige').val(data.guige);
		$('#miaoshu').val(data.miaoshu);
		$('#shuliang').val(data.shuliang);
		$('#danjia').val(data.danjia);
		$('#jiangjia').val(data.jiangjia);
		$('#zhuangt').val(data.zhuangt);
		$('img').attr('src', img[0]);
		$('img').attr('data-src',img[0])
	});
	//图片上传
	$('#imgupload').on('click',function(){
		$('img').removeAttr('src');
		$('img').removeAttr('data-src');
		upload();
	});
	function goodsupdate(){
		var bianhao=$('#bianhao').val();
		var name=$('#name').val();
		var leibie=$('#leibie').val();
		var xiaoleibie=$('#xiaoleibie').val();
		var guige=$('#guige').val();
		var miaoshu=$('#miaoshu').val();
		var shuliang=$('#shuliang').val();
		var danjia=$('#danjia').val();
		var jiangjia=$('#jiangjia').val();
		var zhuangt=$('#zhuangt').val();
		imgstr=imgs.toString();
		// var imgsrc=$('img')[0].dataset.src;	
		var time=new Date().getTime();
		$.post(server+'/api/goods/goodsupdate',
		{'bianhao':bianhao,'name':name,'leibie':leibie,'xiaoleibie':xiaoleibie,'guige':guige,'img':imgstr,'miaoshu':miaoshu,'shuliang':shuliang,
		'danjia':danjia,'jiangjia':jiangjia,
	'zhuangt':zhuangt,'NewTime':time},
		function(res){
			alert(res.msg);
			if(res.err==0){
				window.location.href=('http://localhost:3000/index.html');
			}
			
		});
	}
	function upload() {
		var formData = new FormData() //创建
		formData.append("test", $("#imagelist")[0].files[0])
		console.log(formData.get("test"));
		$.ajax({
			type: "post",
			url: server + "/api/upload/img",
			cache: false,
			contentType: false,
			processData: false,
			data: formData,
			success: function(res) {
				if(res.err == 0) {
					$('img').attr('src', 'http://127.0.0.1:3000/' + res.paths);
					$('img').attr('data-src', 'http://127.0.0.1:3000/' + res.paths)
					$('.imgl').text(res.msg);
					var imgsrc=$('img')[0].dataset.src;
			        imgs.push(imgsrc);
			        
				} else {
					alert('上传错误');
				}
			}
		});
	}