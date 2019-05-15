const express=require('express');
const Router=express.Router();
const msg=require('./msg.js');
const shoppinglist=require('../model/ShoppingList.js');
const goodsModel=require('../model/goodsModel.js');
const shoppingcartModel=require('../model/ShoppingCartModel.js');
const collectionModel=require('../model/collection.js');
//2未发货   3已发货  4已收货未评价  5退货 6换货 7已评价
Router.post('/shoppinglist',function(req,res){
    var pagesize=Number(req.body.pagesize);
    var page=Number(req.body.page);
    var total=0;
    var num=0;
    var zongjia=0;
    var search=req.body.search.toString();
    var type=Number(search);
    if(search=='所有' || search==''){
        shoppinglist.find()
        .then(function(data){       
            for(var i=0;i<data.length;i++){
                 var datas=JSON.parse(data[i].data)
                num+=data[i].addnumber;
                if(datas.jiangjia>0&&datas.jiangjia<1){
                    zongjia+= datas.danjia*datas.jiangjia*data[i].addnumber;  
                }else{
                    zongjia+= datas.danjia*data[i].addnumber;
                }
            }
            total=data.length;
            return shoppinglist.find().limit(pagesize).skip((page-1)*pagesize)
        })
        .then(function(data){
            res.send(msg.sendData(0,'购物信息',{'total':total,'shoplist':data,'num':num,'zongjia':zongjia}))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'购物信息获取出错',null))
        })
    }else if(type>=0){
        shoppinglist.find({$or:[{'fahuo':search},{'delete':search}]})
        .then(function(data){
        for(var i=0;i<data.length;i++){
            var datas=JSON.parse(data[i].data)
            num+=data[i].addnumber;
            if(datas.jiangjia>0&&datas.jiangjia<1){
                zongjia+= datas.danjia*datas.jiangjia*data[i].addnumber;  
            }else{
                zongjia+= datas.danjia*data[i].addnumber;
            }
        }
        total=data.length;
        return shoppinglist.find({$or:[{'fahuo':search},{'delete':search}]}).limit(pagesize).skip((page-1)*pagesize)
       })
        .then(function(data){
        res.send(msg.sendData(0,'购物信息',{'total':total,'shoplist':data,'num':num,'zongjia':zongjia}))
       })
       .catch(function(err){
        res.send(msg.sendData(-1,'购物信息获取出错',null))
      })
    }else{
        shoppinglist.find({$or:[{'UserName':search},{'bianhao':search},{'name':search}]})
        .then(function(data){
        for(var i=0;i<data.length;i++){
            var datas=JSON.parse(data[i].data)
            num+=data[i].addnumber;
            if(datas.jiangjia>0&&datas.jiangjia<1){
                zongjia+= datas.danjia*datas.jiangjia*data[i].addnumber;  
            }else{
                zongjia+= datas.danjia*data[i].addnumber;
            }
        }
        total=data.length;
        return shoppinglist.find({$or:[{'UserName':search},{'bianhao':search},{'name':search}]}).limit(pagesize).skip((page-1)*pagesize)
       })
        .then(function(data){
        res.send(msg.sendData(0,'购物信息',{'total':total,'shoplist':data,'num':num,'zongjia':zongjia}))
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
           if(err){console.log(err)}
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
            updatedata.shuliang=updatedata.shuliang-shu.addnumber;
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
        collectionModel.updateMany({bianhao},{$set:{'data':updatedata}}, 
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
    var username=req.body.UserName;
    if(dingdan=='全部订单'){
        shoppinglist.find({'UserName':username}).sort({BuyingTime:-1})
        .then(function(data){
            res.send(msg.sendData(0,'全部订单信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'订单信息获取出错',null))
        })
    }else if(dingdan=='待配送'){
        shoppinglist.find({'UserName':username,'fahuo':2})
        .then(function(data){
            res.send(msg.sendData(0,'待配送订单信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'待配送信息获取出错',null))
        })
    }else if(dingdan=='待自提'){
        shoppinglist.find({'UserName':username,'fahuo':3})
        .then(function(data){
            res.send(msg.sendData(0,'待自提订单信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'待自提信息获取出错',null))
        })
    }else if(dingdan=='已收货'){
        shoppinglist.find({$or:[{'UserName':username,'fahuo':4},{'UserName':username,'fahuo':7}]})
        .then(function(data){
            res.send(msg.sendData(0,'收货商品信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'收货商品信息获取出错',null))
        })
    }else if(dingdan=='退换货'){
        shoppinglist.find({$or:[{'UserName':username,'fahuo':5},{'UserName':username,'fahuo':6}]})
        .then(function(data){
            res.send(msg.sendData(0,'退换货订单信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'退换货信息获取出错',null))
        })
    }else if(dingdan=='已评价订单'){
        shoppinglist.find({'UserName':username,'fahuo':7})
        .then(function(data){
            res.send(msg.sendData(0,'已评价订单信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'已评价信息获取出错',null))
        })
    }else if(dingdan=='未评价订单'){
        shoppinglist.find({'UserName':username,'fahuo':4})
        .then(function(data){
            res.send(msg.sendData(0,'未评价订单信息',data))
        })
        .catch(function(err){
            console.log(err)
            res.send(msg.sendData(-1,'未评价信息获取出错',null))
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