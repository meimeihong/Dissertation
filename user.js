const express=require('express');
const Router=express.Router();
const mail=require('./email.js');
const msg=require('./msg.js');
const userModel=require('../model/UserModel.js');
var emails={};
Router.post('/proving',function(req,res){
	console.log(req.body);
	var {email}=req.body;
	if(!email || email==""){return res.send(msg.sendData(-1,'验证码发送失败,请查看邮箱是否填写正确',null))};
	var num=(parseInt(Math.random(0,1)*1000+1000)).toString();
	mail.sendmail(email,num)
	.then(function(){
		emails[email]=num;
		res.send(msg.sendData(0,'验证码已发送',null))
	})
	.catch(function(err){
		console.log(err)
		res.send(msg.sendData(-1,'验证码发送失败',null))
	})

});
Router.post('/text',function(req,res){
	var {UserName}=req.body;
	console.log(req.body);
	userModel.find({UserName})
	.then(function(userdata){
	   console.log(userdata);
	   console.log(userdata.length);
	   if (userdata.length<1) { return res.send(msg.sendData(0,'该用户名还没有被注册',null));}
	   	res.send(msg.sendData(-1,'该用户名已被注册',null));
	})
	
});
Router.post('/reg',function(req,res){
	var {email,pass,prov}=req.body;
	console.log(req.body);
	if(emails[email]!==prov){return res.send(msg.sendData(-1,'验证码错误,请重新获取验证码',null))}
	userModel.insertMany({email,pass})
	.then(function(){
		res.send(msg.sendData(0,'注册成功，请登录',null));
	})
	.catch(function(err){
		console.log(err);
		res.send(msg.sendData(-1,'注册失败，可重新注册',null));
	})
	
});
Router.post('/logind',function(req,res){
	var {email,pass}=req.body;
	userModel.find({email,pass})
	.then(function(data){
	   console.log(data);
	   if (data.length>=1) { return res.send(msg.sendData(0,'您已成功登陆',null));}
	   	res.send(msg.sendData(-1,'登陆失败，请重新登陆',null));
	})
});
module.exports=Router;