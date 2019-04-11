const express=require('express');
const Router=express.Router();
const mail=require('./email.js');
const msg=require('./msg.js');
const adminModel=require('../model/AdministratorsModel.js');
      // adminModel.insertMany({UserName,Password})
Router.post('/login',function(req,res){
	var {UserName,Password}=req.body;
	console.log(req.body);
	
    adminModel.find({UserName,Password})
	.then(function(data){
		console.log(data)
		if(data.length>0){
			res.send(msg.sendData(0,'您好，您已登陆成功！',data))
		}else{
			res.send(msg.sendData(-1,'很抱歉，您的用户名或者密码错误。',null))
		}		
	})
	.catch(function(err){
		res.send(msg.sendData(-1,'很抱歉，信息出错。',null))
	})
});
Router.post('/reg',function(req,res){
	var {UserName,Password}=req.body
    adminModel.find({UserName})
	.then(function(data){
		if(data.length>0){
           res.send(msg.sendData(0,'该用户名已被注册',null))
		}else{
			adminModel.insertMany({UserName,Password})
			.then(function(data){
                res.send(msg.sendData(0,'该用户名已注册成功',null))	
			})
			.catch(function(err){
				res.send(msg.sendData(-1,'管理员信息插入出错',null))
			})			
		}		
	})
	.catch(function(err){
		console.log(err)
		res.send(msg.sendData(-1,'管理员信息出错',null))
	})
});

Router.post('/alladmin',function(req,res){
	adminModel.find()
	.then(function(data){
		res.send(msg.sendData(0,'管理员信息',data))
	})
	.catch(function(err){
		res.send(msg.sendData(-1,'管理员信息获取出错',null))
	})
})
Router.post('/deladmin',function(req,res){
	var {UserName} = req.body;
	adminModel.deleteOne({UserName})
	.then(function(data){
		res.send(msg.sendData(0,'管理员信息删除成功',null))
	})
	.catch(function(err){
		res.send(msg.sendData(-1,'管理员信息删除失败',null))
	})
})
module.exports=Router;