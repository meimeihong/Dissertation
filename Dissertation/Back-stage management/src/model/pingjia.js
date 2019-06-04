const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
 let pingjiaSchema=new Schema({
    UserName:{type:String,required:true},
    bianhao:{type:String,required:true},
    content:{type:String,required:false},
    wuliu:{type:Number,required:true},
    fuwu:{type:Number,required:true},
    zhiliang:{type:Number,required:true},
    haoping:{type:Number,required:true},
    res:{type:String,required:false},
    time:{type:String,required:true},
    buytime:{type:Number,required:true}
  });
 let pingjiamodel=mongoose.model('pingjia', pingjiaSchema);
  module.exports=pingjiamodel;
  