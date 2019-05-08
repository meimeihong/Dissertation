const express=require('express');
const Router=express.Router();
const msg=require('./msg.js');
const shoppinglist=require('../model/ShoppingList.js');
const goodsModel=require('../model/goodsModel.js');
const shoppingcartModel=require('../model/ShoppingCartModel.js');
//2未发货   3已发货  4已收货带评价  5退换货
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
        var shu={addnumber};
        var updatedata={data};
            updatedata=JSON.parse( updatedata.data);
            // console.log(updatedata.shuliang)
            updatedata.shuliang=updatedata.shuliang-shu.addnumber;
            // console.log(updatedata.shuliang)
            // console.log(shu.addnumber)
        updatedata=JSON.stringify(updatedata)
        shoppinglist.insertMany({UserName,bianhao,data,addnumber,fahuo,BuyingTime,deletes})
            .then(function(data){
            })
            .catch(function(err){
                console.log(err)
            });
        goodsModel.find({bianhao})
        .then(function(data){
            var shul=Number(data[0].shuliang)-Number(shu.addnumber)
            console.log(data[0].shuliang)
            goodsModel.updateOne({bianhao},{'shuliang':shul}, 
            function(err, resp) {
            console.log(err)
            });
        })
        .catch(function(err){
            console.log(err)
        });
        shoppingcartModel.updateMany({bianhao},{$set:{'data':updatedata}}, 
        function(err, resp) {
        console.log(err)
        });
    }
}).then(function(data){
        res.send(msg.sendData(0,'商品购买成功',null))
}) .catch(function(err){
    console.log(err)
    res.send(msg.sendData(-1,'商品购买失败',null))
})
    
   
    
})
Router.post('/dingdan',function(req,res){
    var dingdan=req.body.dingdan;
    if(dingdan=='全部订单'){
        shoppinglist.find()
        .then(function(data){
            res.send(msg.sendData(0,'全部订单信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'订单信息获取出错',null))
        })
    }else if(dingdan=='待配送'){
        shoppinglist.find({'fahuo':2})
        .then(function(data){
            res.send(msg.sendData(0,'待配送订单信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'待配送信息获取出错',null))
        })
    }else if(dingdan=='待自提'){
        shoppinglist.find({'fahuo':3})
        .then(function(data){
            res.send(msg.sendData(0,'待自提订单信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'待自提信息获取出错',null))
        })
    }else{
        shoppinglist.find({'fahuo':5})
        .then(function(data){
            res.send(msg.sendData(0,'退换货订单信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'退换货信息获取出错',null))
        })
    }
})
Router.post('/shouhuo',function(req,res){
    var {UserName,bianhao,BuyingTime}=req.body;
    shoppinglist.updateOne({UserName,bianhao,BuyingTime},{'fahuo':4}, 
        function(err, resp) {
        console.log(err)
    })
    .then(function(data){
        res.send(msg.sendData(0,'收货成功',data))
    })
    .catch(function(err){
        console.log(err)
        res.send(msg.sendData(-1,'收货出错',null))
    })
})
module.exports=Router;