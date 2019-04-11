const express=require('express');
const Router=express.Router();
const msg=require('./msg.js');
const shoppingcartModel=require('../model/ShoppingCartModel.js');
// shoppingcartModel.delete();
// var shop={bianhao:"dsdasa",name:"dsdss",leibie:"ddss",img:"sss",danjia:122};
// var bian=JSON.stringify(shop);
// shoppinglist.insertMany([{UserName:'user2',bianhao:'dd1',danjia:12,data:bian,
// name:'dsdsss',addnumber:1,delete:1},{UserName:'user3',bianhao:'dd2',danjia:122,data:bian,
// name:'dsdsss',addnumber:1,delete:1},{UserName:'user4',bianhao:'dd3',danjia:122,data:bian,
// name:'dsdsss',addnumber:1,delete:1}])
Router.post('/shoppingcart',function(req,res){
    var pagesize=Number(req.body.pagesize);
    var page=Number(req.body.page);
    var total=0;
    var num=0;
    var search=req.body.search;
    var type=Number(search);
	console.log(type)
    console.log(req.body);
    if(search=='所有' || search==''){
        shoppingcartModel.find()
        .then(function(data){
            for(var i=0;i<data.length;i++){
                num+=data[i].addnumber;
            }
            console.log(data)
            total=data.length;
            return shoppingcartModel.find().limit(pagesize).skip((page-1)*pagesize)
        })
        .then(function(data){
            res.send(msg.sendData(0,'购物车信息',{'total':total,'cartlist':data,'num':num}))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'购物车信息获取出错',null))
        })
    }else if(type>=0){
        shoppingcartModel.find({'delete':search})
        .then(function(data){
            for(var i=0;i<data.length;i++){
                num+=data[i].addnumber;
            }
            total=data.length;
            return shoppingcartModel.find({'delete':search}).limit(pagesize).skip((page-1)*pagesize)
        })
        .then(function(data){
            res.send(msg.sendData(0,'购物车信息',{'total':total,'cartlist':data,'num':num}))
        })
        .catch(function(err){
            res.send(msg.sendData(-1,'购物车信息获取出错',null))
        })
    } else{
        shoppingcartModel.find({$or:[{'UserName':search},{'bianhao':search},{'name':search}]})
       .then(function(data){
        for(var i=0;i<data.length;i++){
            num+=data[i].addnumber;
        }
        total=data.length;
        return shoppingcartModel.find({$or:[{'UserName':search},{'bianhao':search},{'name':search}]}).limit(pagesize).skip((page-1)*pagesize)
    })
    .then(function(data){
        res.send(msg.sendData(0,'购物车信息',{'total':total,'cartlist':data,'num':num}))
    })
    .catch(function(err){
        res.send(msg.sendData(-1,'购物车信息获取出错',null))
    })
}
})
module.exports=Router;