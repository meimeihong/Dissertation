const express=require('express');
const Router=express.Router();
const mail=require('./email.js');
const msg=require('./msg.js');
const userModel=require('../model/UserModel.js');

Router.post('/nametext',function(req,res){
var {UserName}=req.body;
	console.log(req.body);
	userModel.find({UserName})
	.then(function(userdata){
	   console.log(userdata);
	   if (userdata.length<1) { return res.send(msg.sendData(0,'该用户名还没有被注册',null));}
	   	res.send(msg.sendData(-1,'该用户名已被注册',null));
	})
});
module.exports=Router;