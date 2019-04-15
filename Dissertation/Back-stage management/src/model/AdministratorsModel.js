const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
 let AdminSchema=new Schema({
    UserName:{type:String,required:true},
    Password:{type:String,required:true}
  });
 let adminmodel=mongoose.model('Administrators', AdminSchema);
  module.exports=adminmodel;
  