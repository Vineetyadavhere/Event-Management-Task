const mongoose = require("mongoose");

let eventtypeSchema = new mongoose.Schema(
  {
    
        eventname:{
          type:String
        },
        email: {
          type: String,
        },
        eventtype:{
          type:String,
        },
        fulladdress:{
            type:String,
        },
        eventstatus:{
            type:String,
        },
        eventstartDate:{
          type:String,
          
        },
        eventendDate:{
          type:String,
        },
        startTime: {
          type: String, 
          
        },
        endTime: {
          type: String, 
          
        }
  },
  { timestamps: true }
);

module.exports = mongoose.model("eventtype", eventtypeSchema);
