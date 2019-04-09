const  mongoose=require('mongoose')
let Schema = mongoose.Schema;
let goods=new Schema({
	bianhao:{type:String,required:true},
	name:{type:String,required:true},
	leibie:{type:String,required:true},
	xiaoleibie:{type:String,required:true},
	guige:{type:String,required:true},
	img:{type:String,required:true},
	miaoshu:{type:String,required:true},
	shuliang:{type:Number,required:true},
	danjia:{type:Number,required:true},
	jiangjia:{type:String,required:true},
	zhuangt:{type:Number,required:true},
	NewTime:{type:Number,required:true}
});
let goodsmodel=mongoose.model('Goods', goods);
module.exports=goodsmodel;