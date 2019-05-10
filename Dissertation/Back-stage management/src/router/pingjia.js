const express=require('express');
const Router=express.Router();
const msg=require('./msg.js');
const pingjia=require('../model/pingjia.js');
const shoppinglist=require('../model/ShoppingList.js');
//添加评价
Router.post('/addpingjia',function(req,res){
    var {UserName,bianhao,content,wuliu,fuwu,zhiliang,haoping,time,buytime}=req.body;
    var bianhao=req.body.bianhao;
    var buytime=Number(req.body.buytime);
    pingjia.insertMany({UserName,bianhao,content,wuliu,fuwu,zhiliang,haoping,time,buytime})
    .then(function(data){
        shoppinglist.updateOne({
            'bianhao':bianhao,
            'BuyingTime':buytime
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
        console.log(err)
        res.send(msg.sendData(-1,'评价失败',null))
    })
})
//查看单条评价
Router.post('/readpingjia',function(req,res){
    var {UserName,bianhao,buytime}=req.body;
    pingjia.find( {UserName,bianhao,buytime})
    .then(function(data){
          if(data.length>0){
            res.send(msg.sendData(0,'评价',data))  
          }else{
            res.send(msg.sendData(-1,'该商品还没有评价',null)) 
          }
    })
    .catch(function(err){
        console.log(err)
        res.send(msg.sendData(-1,'评价',null))
    })
})
//查看所有评价

//查看某商品的评价
Router.post('/onepingjia',function(req,res){
    var {bianhao}=req.body;
    pingjia.find({bianhao})
    .then(function(data){
        console.log(data)
          if(data.length>0){
              var haoping=[]
              for(var i=0;i<data.length;i++){
                   if(data[i].haoping>=3){
                    haoping.push(i);
                }
              }
            var haopinglv=(Number(haoping.length)/Number(data.length)*100).toFixed(2);
            res.send(msg.sendData(0,'评价',{'pingjiadata':data,'haopinglv':haopinglv}))  
          }else{
            res.send(msg.sendData(-1,'该商品还没有评价',null)) 
          }
    })
    .catch(function(err){
        console.log(err)
        res.send(msg.sendData(-1,'评价',null))
    })
})
//修改评价
Router.post('/xiugaipingjia',function(req,res){
	var {UserName,bianhao,content,wuliu,fuwu,zhiliang,haoping,time,buytime}=req.body;
    pingjia.updateOne({UserName,bianhao,buytime},{UserName,bianhao,content,wuliu,fuwu,zhiliang,haoping,time,buytime}, 
    function(err, resp) {
        if(err){res.send(msg.sendData(-1,'商品信息修改失败',null))}
        res.send(msg.sendData(0,'商品信息修改成功',null))
    });
})
module.exports=Router;