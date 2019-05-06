const express=require('express');
const Router=express.Router();
const msg=require('./msg.js');
const shoppingcartModel=require('../model/ShoppingCartModel.js');
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
Router.post('/addtocart',function(req,res){
    var bianhao=req.body.bianhao;
    var UserName=req.body.UserName;
    var datas=req.body.data;
    var jian=req.body.jiajian;
    shoppingcartModel.find({'bianhao':bianhao,'UserName':UserName})
    .then(function(data){
        console.log(data[0]);
        if(data.length<=0){
            shoppingcartModel.insertMany({'bianhao':bianhao,'UserName':UserName,'data':datas,'addnumber':1,'delete':1})
            .then(function(data){
				console.log('yes')
			 res.send(msg.sendData(0,'加入购物车成功',data))
			})
			.catch(function(err){
				res.send(msg.sendData(-1,'加入购物车失败',null))
			})
        }else{
            if(req.body.jiajian>0){
                var addnum=req.body.jiajian
            }else{
                var addnum=Number(data[0].addnumber)+1;
            }         
            // console.log(addnum)
            shoppingcartModel.updateOne({'bianhao':bianhao,'UserName':UserName},{$set:{'addnumber':addnum}}, 
                function(err, resp) {
                    if(err){
                        console.log(err)
                        res.send(msg.sendData(-1,'加入购物车失败',null))
                    }else{
                        res.send(msg.sendData(0,'加入购物车成功',null))
                    }
                    
             });  
        }
    })
})
Router.post('/cartlist',function(req,res){
    const {UserName}=req.body;
    shoppingcartModel.find({UserName})
    .then(function(data){
        res.send(msg.sendData(0,'购物车',data))
    })
    .catch(function(err){
        res.send(msg.sendData(-1,'购物车商品获取失败',null))
    })
})
Router.post('/deletecartdata',function(req,res){
    var {bianhao,UserName}=req.body;
    console.log(1)
    shoppingcartModel.deleteOne({bianhao,UserName})
		.then(function(data){
            res.send(msg.sendData(0,'购物车商品删除成功',data))
		})
		.catch(function(err){
        console.log(err)
        res.send(msg.sendData(-1,'购物车商品删除失败',null))
		})
})
module.exports=Router;