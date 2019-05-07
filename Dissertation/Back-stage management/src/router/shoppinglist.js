const express=require('express');
const Router=express.Router();
const msg=require('./msg.js');
const shoppinglist=require('../model/ShoppingList.js');
//2未发货   3已发货  4已收货
Router.post('/shoppinglist',function(req,res){
    var pagesize=Number(req.body.pagesize);
    var page=Number(req.body.page);
    var total=0;
    var num=0;
    var search=req.body.search.toString();
    var type=Number(search);
	console.log(type)
    console.log(req.body);
    if(search=='所有' || search==''){
        shoppinglist.find()
        .then(function(data){
            for(var i=0;i<data.length;i++){
                num+=data[i].shuliang;
            }
            console.log(data)
            total=data.length;
            return shoppinglist.find().limit(pagesize).skip((page-1)*pagesize)
        })
        .then(function(data){
            res.send(msg.sendData(0,'购物信息',{'total':total,'shoplist':data,'num':num}))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'购物信息获取出错',null))
        })
    }else if(type>=0){
        shoppinglist.find({$or:[{'fahuo':search},{'delete':search}]})
        .then(function(data){
        console.log(data)
        for(var i=0;i<data.length;i++){
            num+=data[i].shuliang;
        }
        total=data.length;
        return shoppinglist.find({$or:[{'fahuo':search},{'delete':search}]}).limit(pagesize).skip((page-1)*pagesize)
       })
        .then(function(data){
        res.send(msg.sendData(0,'购物信息',{'total':total,'shoplist':data,'num':num}))
       })
       .catch(function(err){
        res.send(msg.sendData(-1,'购物信息获取出错',null))
      })
    }else{
        console.log(1)
        shoppinglist.find({$or:[{'UserName':search},{'bianhao':search},{'name':search}]})
        .then(function(data){
        console.log(data)
        for(var i=0;i<data.length;i++){
            num+=data[i].shuliang;
        }
        total=data.length;
        return shoppinglist.find({$or:[{'UserName':search},{'bianhao':search},{'name':search}]}).limit(pagesize).skip((page-1)*pagesize)
       })
        .then(function(data){
        res.send(msg.sendData(0,'购物信息',{'total':total,'shoplist':data,'num':num}))
       })
       .catch(function(err){
        res.send(msg.sendData(-1,'购物信息获取出错',null))
      })
}
})

Router.post('/update',function(req,res){
    console.log(req.body);
    shoppinglist.updateOne({
        'UserName':req.body.user,
        'bianhao':req.body.bianh,
        'fahuo':2
    },{
        $set:{
            'fahuo':3
        }
    },function(err,result){
           if(err){console.log('a')}
           res.send(msg.sendData(0,'已发货',null))
           return
    })
})
Router.post('/addtogoodslist',function(req,res){
   var goodslist=JSON.parse(req.body.goodslist);
   shoppinglist.find()
   .then(function(data){
    for(var i in goodslist){
        var {UserName,bianhao,data,addnumber,fahuo,BuyingTime,deletes}=goodslist[i]
        shoppinglist.insertMany({UserName,bianhao,data,addnumber,fahuo,BuyingTime,deletes})
            .then(function(data){
            })
            .catch(function(err){
                console.log(err)
            })
        }
}).then(function(data){
        res.send(msg.sendData(0,'商品购买成功',null))
}) .catch(function(err){
    console.log(err)
    res.send(msg.sendData(-1,'商品购买失败',null))
})
    
   
    
})
module.exports=Router;