const express=require('express');
const Router=express.Router();
const mail=require('./email.js');
const msg=require('./msg.js');
const userModel=require('../model/UserModel.js');
var emails={};
	//   userModel.insertMany([{UserName:'user1',Password:'user1',Email:'213333',TelephoneNumber:'12345678909'},
	//   {UserName:'user1',Password:'user1',Email:'213333',TelephoneNumber:'12345678909'},
	//   {UserName:'user1',Password:'user1',Email:'213333',TelephoneNumber:'12345678909'}]);

Router.post('/userlist',function(req,res){
		var pagesize=Number(req.body.pagesize);
		var page=Number(req.body.page);
		var total=0;
		var search=req.body.search;
		console.log(req.body);
		if(search=='所有' || search==''){
			userModel.find()
			.then(function(data){
				total=data.length;
				return userModel.find().limit(pagesize).skip((page-1)*pagesize)
			})
			.then(function(data){
				res.send(msg.sendData(0,'商品信息',{'total':total,'userlist':data}))
			})
			.catch(function(err){
				res.send(msg.sendData(-1,'用户信息获取出错',null))
			})
		}else{
		userModel.find({$or:[{'UserName':search},{'Email':search},{'TelephoneNumber':search}]})
		.then(function(data){
			total=data.length;
			return userModel.find({$or:[{'UserName':search},{'Email':search},{'TelephoneNumber':search}]}).limit(pagesize).skip((page-1)*pagesize)
		})
		.then(function(data){
			res.send(msg.sendData(0,'用户信息',{'total':total,'userlist':data}))
		})
		.catch(function(err){
			res.send(msg.sendData(-1,'用户信息获取出错',null))
		})
	}
})
Router.post('/usertext',function(req,res){
	var {UserName}=req.body;
	userModel.find({UserName})
	.then(function(data){
	var length=data.length;
	if(length>0){
		res.send(msg.sendData(-1,'该用户名已存在，请重新设置',null));
	}else{
		res.send(msg.sendData(0,'该用户名可注册',null));
	}
	})
})
Router.post('/reg',function(req,res){
	var {UserName,Password,Email,TelephoneNumber}=req.body;
	console.log(req.body);
	userModel.insertMany({UserName,Password,Email,TelephoneNumber})
	.then(function(){
		res.send(msg.sendData(0,'注册成功，请登录',null));
	})
	.catch(function(err){
		console.log(err);
		res.send(msg.sendData(-1,'注册失败，可重新注册',null));
	})
	
});
Router.post('/login',function(req,res){
	var {UserName,Password}=req.body;
	userModel.find({UserName,Password})
	.then(function(data){
	//    console.log(data);
	   if (data.length>=1) { return res.send(msg.sendData(0,'您已成功登陆',null));}
	   	res.send(msg.sendData(-1,'登陆失败，请重新登陆',null));
	})
});


Router.post('/proving',function(req,res){
	// console.log(req.body);
	var {Email,UserName}=req.body;
	userModel.find({Email,UserName})
	.then(function(data){
            if(data.length>=1){
				var num=(parseInt(Math.random(0,1)*1000+1000)).toString();
				mail.sendmail(Email,num)
	            .then(function(){
					emails.send=num;
					res.send(msg.sendData(0,'验证码已发送',null))
				})
				.catch(function(err){
					console.log(err)
					res.send(msg.sendData(-1,'验证码发送失败',null))
				})
			}else{
				res.send(msg.sendData(-1,'请确定您的用户名与邮箱是否匹配',null))
			}
	})
});

Router.post('/password',function(req,res){
	var {Email,UserName,Password,prov}=req.body;
//	console.log(req.body);
	if(emails.send!==prov){
		return res.send(msg.sendData(-1,'验证码错误,请重新获取验证码',null))
	}else{
		userModel.updateOne({UserName},{$set:{Password}}, 
	    function(err, resp) {
			if(err){res.send(msg.sendData(-1,'密码修改失败',null))}
			res.send(msg.sendData(0,'密码修改成功',null))
	 });
	}
	
	
});
// Router.post('/reg',function(req,res){
// 	var {email,pass,prov}=req.body;
// 	console.log(req.body);
// 	if(emails[email]!==prov){return res.send(msg.sendData(-1,'验证码错误,请重新获取验证码',null))}
// 	userModel.insertMany({email,pass})
// 	.then(function(){
// 		res.send(msg.sendData(0,'注册成功，请登录',null));
// 	})
// 	.catch(function(err){
// 		console.log(err);
// 		res.send(msg.sendData(-1,'注册失败，可重新注册',null));
// 	})
	
// });
// Router.post('/logind',function(req,res){
// 	var {email,pass}=req.body;
// 	userModel.find({email,pass})
// 	.then(function(data){
// 	   console.log(data);
// 	   if (data.length>=1) { return res.send(msg.sendData(0,'您已成功登陆',null));}
// 	   	res.send(msg.sendData(-1,'登陆失败，请重新登陆',null));
// 	})
// });
module.exports=Router;