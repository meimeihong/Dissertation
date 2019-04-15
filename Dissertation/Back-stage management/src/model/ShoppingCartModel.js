const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
 let shoppingcartSchema=new Schema({
    UserName:{type:String,required:true},
    bianhao:{type:String,required:true},
    data:{type:String,required:true},
    addnumber:{type:Number,required:true},
    delete:{type:String,required:true}
  });
 let shoppingcartmodel=mongoose.model('ShoppingCart', shoppingcartSchema);
  module.exports=shoppingcartmodel;
  