var mongoose = require('mongoose')
   var UserSchema = mongoose.Schema({
    id:{
      type:String,
      require:true,
      Unique:true,
    }, 
    first_name:{
      type:String,
      require:true,
      
    },
    last_name:{
      type:String,
      require:true,
          
    },
    age:{
      type: Number,
      require:false,
   },
   gender:{
     type:String,
     enum: [ 'male', 'female'],
     require:true,
   },
    address:{
      type:String,
      require:true,
      
    },
     phone_number:{
      type:String,
      require:true,
    }

   }

   )
   const Studentdb =mongoose.model('Studentdb',UserSchema)
   module.exports=Studentdb;
   