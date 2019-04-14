const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
 let userSchema=new Schema({
    UserName:{type:String,required:true},
    Password:{type:String,required:true},
    Email:{type:String,required:true},
    TelephoneNumber:{type:String,required:false},
    dizhi:{type:String,required:false},
  });
  // type 字段类型  required 是否必须
 let usermodel=mongoose.model('Customer', userSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=usermodel;