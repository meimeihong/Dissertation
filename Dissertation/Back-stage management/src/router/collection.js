const express=require('express');
const Router=express.Router();
const msg=require('./msg.js');
const collectionModel=require('../model/collection.js');
Router.post('/collection',function(req,res){
	var {UserName,bianhao,data}=req.body
    collectionModel.insertMany({UserName,bianhao,data})
    .then(function(data){
        res.send(msg.sendData(0,'该商品已被收藏',null))	;
    })
    .catch(function(err){
        res.send(msg.sendData(-1,'商品收藏出错',null));
    })					
	})
Router.post('/delecollection',function(req,res){
    var {UserName,bianhao}=req.body;
        collectionModel.deleteOne({UserName,bianhao})
            .then(function(data){
                res.send(msg.sendData(0,'此收藏商品已被移除',null))
            })
            .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'此收藏商品移除失败',null))
            })       
});
    
Router.post('/onecollection',function(req,res){
    var {UserName,bianhao}=req.body;
    collectionModel.find({bianhao,UserName})
		.then(function(data){
            if(data.length>0){
                res.send(msg.sendData(0,'此收藏商品存在',null))
            }else{
                res.send(msg.sendData(-1,'此收藏商品不存在',null))
            }        
		})
		.catch(function(err){
        console.log(err)
		})
});
module.exports=Router;