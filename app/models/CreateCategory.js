const mongoose = require("mongoose");

let eventSchema = new mongoose.Schema(
  {
    category:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", eventSchema);
