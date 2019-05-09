const express=require('express');
const Router=express.Router();
const msg=require('./msg.js');
const pingjia=require('../model/pingjia.js');
const shoppinglist=require('../model/ShoppingList.js');
//添加评价
Router.post('/addpingjia',function(req,res){
    var {UserName,bianhao,content,wuliu,fuwu,zhiliang,haoping,time}=req.body;
    var bianhao=req.body.bianhao;
    pingjia.insertMany({UserName,bianhao,content,wuliu,fuwu,zhiliang,haoping,time})
    .then(function(data){
        shoppinglist.updateOne({
            'bianhao':bianhao,
        },{
            $set:{'fahuo':7}
        },function(err,result){
               if(err){console.log(err)}
        })      
    })
    .then(function(data){
         res.send(msg.sendData(0,'评价成功',data))
    })
    .catch(function(err){
        res.send(msg.sendData(-1,'评价失败',null))
    })
})
//查看单条评价

//查看所有评价

//查看某商品的评价