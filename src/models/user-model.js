const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  role: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 0,
  },
  address:{
    type:String,
    default:null
  },
  credit_card:{
    type:String,
    default:null,
    
  }
},{
  timestamps:true,
  
});

//Export the model
module.exports = mongoose.model("User", userSchema);
