const express=require('express');
const Router=express.Router();
const msg=require('./msg.js');
const goodsModel=require('../model/goodsModel.js');
//添加商品信息
Router.post('/addgoods',function(req,res){
	console.log(req.body)
	var bianhaof=req.body.bianhao;
	goodsModel.find({'bianhao':bianhaof})
	.then(function(data){
		console.log(data.length);
		if(data.length<1){
			var {bianhao,name,leibie,xiaoleibie,guige,img,miaoshu,shuliang,danjia,jiangjia,zhuangt,NewTime}=req.body;	
			goodsModel.insertMany({bianhao,name,leibie,xiaoleibie,guige,img,miaoshu,shuliang,danjia,jiangjia,zhuangt,NewTime})
			.then(function(data){
				console.log('yes')
			 res.send(msg.sendData(0,'添加商品信息成功',data))
			})
			.catch(function(err){
				res.send(msg.sendData(-1,'添加商品信息失败',null))
			})
		}else{
			res.send(msg.sendData(-1,'商品编号冲突，请重新设置编号',null))
		}
	//  res.send(msg.sendData(0,'添加商品信息成功',data))
	})
	
});
//商品初始状态  查询  排序  分页
Router.post('/goodslist',function(req,res){
	var pagesize=Number(req.body.pagesize);
	var page=Number(req.body.page);
	var total=0;
	var leibie=req.body.leibie;
	var type=Number(leibie);
	console.log(type)
	console.log(req.body.sortdown,req.body);
	console.log(leibie);
	if(leibie=='所有' || leibie==''){
		goodsModel.find()
		.then(function(resdb){
			console.log(resdb)
			if(req.body.sortdown=='sortdown'){
				total=resdb.length;
				return goodsModel.find().sort({NewTime:-1}).limit(pagesize).skip((page-1)*pagesize)
			}else if(req.body.sortup=='sortup'){
				total=resdb.length;
				return goodsModel.find().sort({NewTime:1}).limit(pagesize).skip((page-1)*pagesize)
			}else{
				total=resdb.length;
				return goodsModel.find().limit(pagesize).skip((page-1)*pagesize)
			}
			
		})
		.then(function(data){
			console.log(data)
			res.send(msg.sendData(0,'商品信息',{'total':total,'goodslist':data}))
		})
		.catch(function(err){
			res.send(msg.sendData(-1,'商品信息获取出错',null))
		})
	}else if(type>=0){
		goodsModel.find({'zhuangt':leibie})
	    .then(function(resdb){
		console.log(resdb)
		if(req.body.sortdown=='sortdown'){
			total=resdb.length;
			return goodsModel.find({'zhuangt':leibie}).sort({NewTime:-1}).limit(pagesize).skip((page-1)*pagesize)
		}else if(req.body.sortup=='sortup'){
			total=resdb.length;
			return goodsModel.find({'zhuangt':leibie}).limit(pagesize).skip((page-1)*pagesize)
		}else{
			total=resdb.length;
			return goodsModel.find({'zhuangt':leibie}).limit(pagesize).skip((page-1)*pagesize)
		}
		
	   })
	   .then(function(data){
		console.log(data)
		res.send(msg.sendData(0,'商品信息',{'total':total,'goodslist':data}))
	   })
	   .catch(function(err){
		res.send(msg.sendData(-1,'商品信息获取出错',null))
	   })
	}else{
	     goodsModel.find({$or:[{'leibie':leibie},{'name':leibie},{'xiaoleibie':leibie}]})
	    .then(function(resdb){
		console.log(resdb)
		if(req.body.sortdown=='sortdown'){
			total=resdb.length;
			return goodsModel.find({$or:[{'leibie':leibie},{'xiaoleibie':leibie},{'name':leibie}]}).sort({NewTime:-1}).limit(pagesize).skip((page-1)*pagesize)
		}else if(req.body.sortup=='sortup'){
			total=resdb.length;
			return goodsModel.find({$or:[{'leibie':leibie},{'xiaoleibie':leibie},{'name':leibie}]}).sort({NewTime:1}).limit(pagesize).skip((page-1)*pagesize)
		}else{
			total=resdb.length;
			return goodsModel.find({$or:[{'leibie':leibie},{'xiaoleibie':leibie},{'name':leibie}]}).limit(pagesize).skip((page-1)*pagesize)
		}
		
	   })
	   .then(function(data){
		console.log(data)
		res.send(msg.sendData(0,'商品信息',{'total':total,'goodslist':data}))
	   })
	   .catch(function(err){
		res.send(msg.sendData(-1,'商品信息获取出错',null))
	   })
}
	
});
//跳转更新页面数据的获取
Router.post('/update',function(req,res){
	var id=req.body.id;
	if(!id){
		res.send(msg.sendData(-1,'商品信息获取出错,请传递正确的参数',null))
	}
	goodsModel.find({bianhao:id})
	.then(function(data){
		res.send(msg.sendData(0,'信息获取成功',data))
	})
	.catch(function(err){
		res.send(msg.sendData(0,'信息获取失败',null))
	})
});
//更新页面商品信息的修改
Router.post('/goodsupdate',function(req,res){
	var {bianhao,name,leibie,xiaoleibie,guige,img,miaoshu,shuliang,danjia,jiangjia,zhuangt,NewTime}=req.body;
	var id=req.body.bianhao;
	goodsModel.updateOne({bianhao:id},{bianhao,name,leibie,xiaoleibie,guige,img,miaoshu,shuliang,danjia,jiangjia,zhuangt,NewTime}, 
	function(err, resp) {
		if(err){res.send(msg.sendData(-1,'商品信息修改失败',null))}
		res.send(msg.sendData(0,'商品信息修改成功',null))
});
});
//删除单个商品
Router.post('/goodsdelete',function(req,res){
	var id=req.body.id;
	goodsModel.deleteOne({bianhao:id})
	.then(function(data){
		res.send(msg.sendData(0,'商品信息删除成功',null))
	})
	.catch(function(err){
		res.send(msg.sendData(-1,'商品信息删除失败',null))
	})
});

//删除选中的商品
Router.post('/checkdel',function(req,res){
	var data=req.body;
	console.log(data);
	for(var i in data){
//		console.log(data[i])
		goodsModel.deleteOne({bianhao:data[i]})
		.then(function(data){
//		console.log(data)
		})
		.catch(function(err){
		console.log(err)
		})
	}
	res.send(msg.sendData(0,'商品信息删除成功',null));
})
//商品类别

Router.post('/daleibie',function(req,res){
	var daleibie=[];
goodsModel.find()
	.then(function(data){		
		for(var i=0;i<data.length;i++){			
			var lnum=daleibie.indexOf(data[i].leibie);			
			if(lnum==-1){
				daleibie.push(data[i].leibie);
			}			
		}		
	})
	.then(function(data){
		res.send(msg.sendData(0,'商品类别',daleibie));
	})
	.catch(function(err){
		console.log(err)
		})
	
})
Router.post('/xiaoleibie',function(req,res){
	var {leibie}=req.body;
	console.log(req.body);
	const xiaoleibie=[];
	var xiaolb=[]
	goodsModel.find({leibie})
	.then(function(data){		
		for(var i=0;i<data.length;i++){
			var xiao={};
			var lnum=xiaoleibie.indexOf(data[i].xiaoleibie);			
			if(lnum==-1){
				var img=data[i].img.split(",")[0];
				xiaoleibie.push(data[i].xiaoleibie);
				xiao.leibie=data[i].xiaoleibie;
				xiao.img=img;
				xiaolb.push(xiao);
			}			
		}
		res.send(msg.sendData(0,'商品小类别',xiaolb));
	})
	.catch(function(err){
		console.log(err)
		})	
})
Router.post('/classifycontent',function(req,res){
	var {xiaoleibie}=req.body;
	console.log(req.body)
	goodsModel.find({xiaoleibie})
	.then(function(data){
		console.log(data)
		res.send(msg.sendData(0,{xiaoleibie},data));
	})
	.catch(function(err){
		console.log(err)
	})

})
Router.post('/classifym',function(req,res){
	var {leibie}=req.body;
	var select=req.body.select;
	var paixu=req.body.paixu;
	if(select=='价格'){
          if(paixu){
			goodsModel.find({leibie}).sort({danjia:1})
			.then(function(data){
				console.log(data)
				res.send(msg.sendData(0,select,data));
			})
			.catch(function(err){
				console.log(err)
			})		   
			}else{
			goodsModel.find({leibie}).sort({danjia:-1})
			.then(function(data){
				console.log(data)
				res.send(msg.sendData(0,select,data));
			})
			.catch(function(err){
				console.log(err)
			})
		       }
	}else if(select=='销量'){
		goodsModel.find({leibie}).sort({shuliang:-1})
		.then(function(data){
			console.log(data)
			res.send(msg.sendData(0,select,data));
		})
		.catch(function(err){
			console.log(err)
		})
	}else if(select=='新品'){
		goodsModel.find({leibie}).sort({NewTime:-1})
		.then(function(data){
			console.log(data)
			res.send(msg.sendData(0,select,data));
		})
		.catch(function(err){
			console.log(err)
		})
	}else{
		goodsModel.find({leibie})
		.then(function(data){
			console.log(data)
			res.send(msg.sendData(0,select,data));
		})
		.catch(function(err){
			console.log(err)
		}) 
	}
})
//轮播图
Router.post('/banner',function(req,res){
	var banner=[];
	goodsModel.find({'leibie':'新鲜水果'}).sort({shuliang:-1}).limit(1)
			.then(function(data){
				banner=banner.concat(data)				
			})
			.then(function(data){
				goodsModel.find({'leibie':'精选肉类'}).sort({shuliang:-1}).limit(1)
				.then(function(data){
					banner=banner.concat(data);					
				})
			})
			.then(function(data){
				goodsModel.find({'leibie':'新鲜蔬菜'}).sort({shuliang:-1}).limit(1)
				.then(function(data){
					banner=banner.concat(data);
				})
			})
			.then(function(data){
				goodsModel.find({'leibie':'海鲜水产'}).sort({shuliang:-1}).limit(1)
				.then(function(data){
					banner=banner.concat(data);
				})
			})
			.then(function(data){
				goodsModel.find({'leibie':'酒水饮料'}).sort({shuliang:-1}).limit(1)
				.then(function(data){
					banner=banner.concat(data);
					res.send(msg.sendData(0,'推荐',banner));
				})
			})
			.catch(function(err){
				console.log(err)
			})
})
//主页推荐
Router.post('/tuijian',function(req,res){
	var tuijian=[]
			goodsModel.find({'leibie':'新鲜水果'}).sort({NewTime:-1}).limit(2)
			.then(function(data){
				tuijian=tuijian.concat(data)				
			})
			.then(function(data){
				goodsModel.find({'leibie':'新鲜蔬菜'}).sort({NewTime:-1}).limit(3)
				.then(function(data){
					tuijian=tuijian.concat(data);
				})
			})
			.then(function(data){
				goodsModel.find({'leibie':'海鲜水产'}).sort({NewTime:-1}).limit(2)
				.then(function(data){
					tuijian=tuijian.concat(data);
				})
			})
			.then(function(data){
				goodsModel.find({'leibie':'酒水饮料'}).sort({NewTime:-1}).limit(2)
				.then(function(data){
					tuijian=tuijian.concat(data);
				})
			})
			.then(function(data){
				goodsModel.find({'leibie':'精选肉类'}).sort({NewTime:1}).limit(3)
				.then(function(data){
					tuijian=tuijian.concat(data);
					res.send(msg.sendData(0,'推荐',tuijian));
				})
			})
			.catch(function(err){
				console.log(err)
			})	
})
//安心蔬菜
Router.post('/all',function(req,res){
	var all={};
	goodsModel.find({'leibie':'新鲜蔬菜'}).sort({shuliang:-1})
	.then(function(data){
		all.shucai=data;
		// res.send(msg.sendData(0,'安心蔬菜',data));
	})
	.then(function(data){
		goodsModel.find({'leibie':'精选肉类'}).sort({shuliang:-1})
		.then(function(data){
			all.roulei=data;	
		})
	})
	.then(function(data){
		goodsModel.find({'leibie':'休闲零食'}).sort({shuliang:-1})
		.then(function(data){
			all.lingshi=data;	
		})
	})
	.then(function(data){
		goodsModel.find({'leibie':'新鲜水果'}).sort({shuliang:-1})
		.then(function(data){
			all.shuiguo=data;
			res.send(msg.sendData(0,'首页内容数据',all));	
		})
	})
	.catch(function(err){
		console.log(err)
	})
})
//移动端商品查找
Router.post('/searchgoods',function(req,res){
	var searchgoods=req.body.searchname;
	goodsModel.find({$or:[{'leibie':searchgoods},{'name':searchgoods},{'xiaoleibie':searchgoods}]})
	.then(function(data){
		res.send(msg.sendData(0,'查找商品',data));
	})
	.catch(function(err){
		console.log(err)
		res.send(msg.sendData(-1,'查找商品',err));
	})
})
module.exports=Router;