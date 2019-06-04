const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
 let collectionSchema=new Schema({
    UserName:{type:String,required:true},
    bianhao:{type:String,required:true},
    data:{type:String,required:true},
    delete:{type:String,required:false}
  });
 let collectionmodel=mongoose.model('Collection', collectionSchema);
  module.exports= collectionmodel;
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model