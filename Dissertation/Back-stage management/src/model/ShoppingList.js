const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
 let shoppinglistSchema=new Schema({
    UserName:{type:String,required:true},
    bianhao:{type:String,required:true},
    data:{type:String,required:true},
    shuliang:{type:Number,required:true},
    fahuo:{type:Number,required:true},
    BuyingTime:{type:Number,required:true},
    delete:{type:String,required:true}
  });
 let shoppinglistmodel=mongoose.model('ShoppingList', shoppinglistSchema);
  module.exports=shoppinglistmodel;
  