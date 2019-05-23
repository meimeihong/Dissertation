const express=require('express');
const Router=express.Router();
const msg=require('./msg.js');
const goodsModel=require('../model/goodsModel.js');
//添加商品信息
Router.post('/addgoods',function(req,res){
	var {name,bewrite,price,amount,type,time,img}=req.body;
	goodsModel.insertMany({name,bewrite,price,amount,type,time,img})
	.then(function(data){
	 res.send(msg.sendData(0,'添加商品信息成功',data))
	})
	.catch(function(err){
		res.send(msg.sendData(-1,'添加商品信息失败',null))
	})
});
//分页
Router.post('/goodslist',function(req,res){
	var pagesize=Number(req.body.pagesize);
	var page=Number(req.body.page);
	var total=0;
	goodsModel.find()
	.then(function(resdb){
		if(req.body.sortdown=='sortdown'){
			total=resdb.length;
			return goodsModel.find().sort({time:-1}).limit(pagesize).skip((page-1)*pagesize)
		}else if(req.body.sortup=='sortup'){
			total=resdb.length;
			return goodsModel.find().sort({time:1}).limit(pagesize).skip((page-1)*pagesize)
		}else{
			total=resdb.length;
			return goodsModel.find().limit(pagesize).skip((page-1)*pagesize)
		}
		
	})
	.then(function(data){
		res.send(msg.sendData(0,'商品信息',{'total':total,'goodslist':data}))
	})
	.catch(function(err){
		res.send(msg.sendData(-1,'商品信息获取出错',null))
	})
});
//查找所有商品信息
Router.post('/good',function(req,res){
	goodsModel.find()
	.then(function(data){
		res.send(msg.sendData(0,'商品信息',data))
	})
	.catch(function(err){
		console.log(err)
		res.send(msg.sendData(-1,'商品信息获取出错',null))
	})
});
//跳转更新页面数据的获取
Router.post('/update',function(req,res){
	var id=req.body.id;
	if(!id){
		res.send(msg.sendData(-1,'商品信息获取出错,请传递正确的参数',null))
	}
	goodsModel.find({_id:id})
	.then(function(data){
		res.send(msg.sendData(0,'信息获取成功',data))
	})
	.catch(function(err){
		res.send(msg.sendData(0,'信息获取失败',null))
	})
});
//更新页面商品信息的修改
Router.post('/goodsupdate',function(req,res){
	var {_id,name,bewrite,price,amount,type,time,img}=req.body;
	var id=req.body._id;
	goodsModel.updateOne({_id:id}, {_id,name,bewrite,price,amount,type,time,img}, 
	function(err, resp) {
		if(err){res.send(msg.sendData(-1,'商品信息修改失败',null))}
		res.send(msg.sendData(0,'商品信息修改成功',null))
});
});
//删除单个商品
Router.post('/goodsdelete',function(req,res){
	var id=req.body.id;
	goodsModel.deleteOne({_id:id})
	.then(function(data){
		res.send(msg.sendData(0,'商品信息删除成功',null))
	})
	.catch(function(err){
		res.send(msg.sendData(-1,'商品信息删除失败',null))
	})
});
//根据商品分类查找商品
Router.post('/search',function(req,res){
	var type=req.body.type;
	goodsModel.find({'type':type})
	.then(function(data){
		res.send(msg.sendData(0,'商品信息获取成功',data));
	})
	.catch(function(err){
		res.send(msg.sendData(-1,'商品信息获取失败',null));
	})
});
//删除选中的商品
Router.post('/checkdel',function(req,res){
	var data=req.body;
	console.log(data);
	for(var i in data){
//		console.log(data[i])
		goodsModel.deleteOne({_id:data[i]})
		.then(function(data){
//		console.log(data)
		})
		.catch(function(err){
		console.log(err)
		})
	}
	res.send(msg.sendData(0,'商品信息删除成功',null));
})
module.exports=Router;