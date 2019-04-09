var server='http://127.0.0.1:3000';
	//图片上传
	var imgs=[];
	var imgstr=null;
	function upload(){
//	console.log(111)
//  console.log($("#imagelist")[0].files)
    var formData = new FormData()//创建
//  console.log(formData)
    formData.append("test",$("#imagelist")[0].files[0])  
//  console.log(formData.get("test"));
   $.ajax({
   	type:"post",
   	url:server+"/api/upload/img",
   	cache: false,
    contentType: false,
    processData: false,
   	data:formData,
   	success:function(res){
// 		console.log(res);
   		if(res.err==0){
   			$('img').attr('src','http://127.0.0.1:3000/'+res.paths);
   			$('img').attr('data-src','http://127.0.0.1:3000/'+res.paths)
			$('.imgl').text(res.msg);
			var imgsrc=$('img')[0].dataset.src;
			imgs.push(imgsrc);
			imgstr=imgs.toString();
			var imgj=imgstr.split(',');
			console.log(imgstr,imgj);
   		}else{
   			alert('上传错误');
   		}
   	}
   });
	}
	//添加商品信息
	function addgoods(){
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
		// var imgsrc=$('img')[0].dataset.src;	
		var time=new Date().getTime();
		$.post(server+'/api/goods/addgoods',
		{'bianhao':bianhao,'name':name,'leibie':leibie,'xiaoleibie':xiaoleibie,'guige':guige,'img':imgstr,'miaoshu':miaoshu,'shuliang':shuliang,'danjia':danjia,'jiangjia':jiangjia,
	'zhuangt':zhuangt,'NewTime':time},
		function(res){
			alert(res.msg);
			console.log(res.msg);
			console.log("w");
			console.log(res);
			imgs=[];
	        imgstr=null;
//		 	$('#name').val('');
//		 	$('#bewrite').val('');
//			$('#price').val('');
//			$('#amount').val('');
//			$('#type').val('');
//			$('img').removeAttr('src');
//			$('img').removeAttr('data-src');
//			$('.imgl').text('');
		});
	}