const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
 let AdminSchema=new Schema({
    UserName:{type:String,required:true},
    Password:{type:String,required:true}
  });
  // type 字段类型  required 是否必须
 let adminmodel=mongoose.model('Administrators', AdminSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=adminmodel;