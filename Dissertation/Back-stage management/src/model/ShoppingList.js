const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
 let shoppinglistSchema=new Schema({
    UserName:{type:String,required:true},
    bianhao:{type:String,required:true},
    data:{type:String,required:true},
    addnumber:{type:Number,required:true},
    fahuo:{type:Number,required:true},
    BuyingTime:{type:Number,required:true},
    deletes:{type:String,required:true}
  });
 let shoppinglistmodel=mongoose.model('ShoppingList', shoppinglistSchema);
  module.exports=shoppinglistmodel;
  