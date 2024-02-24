const mongoose = require("mongoose");

let frontenduserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
    },
    password:{
        type:String,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("frontenduser", frontenduserSchema);
