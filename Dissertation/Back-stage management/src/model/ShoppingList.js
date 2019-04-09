const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
 let shoppinglistSchema=new Schema({
    UserName:{type:String,required:true},
    bianhao:{type:String,required:true},
    name:{type:String,required:true},
    data:{type:String,required:true},
    shuliang:{type:Number,required:true},
    fahuo:{type:Number,required:true},
    BuyingTime:{type:Number,required:true},
    delete:{type:String,required:true}
  });
  // type 字段类型  required 是否必须
 let shoppinglistmodel=mongoose.model('ShoppingList', shoppinglistSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=shoppinglistmodel;