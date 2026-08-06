const mongoose=require("mongoose");


const transactionSchema= new mongoose.Schema({
      FromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:true,
        index:true
      },
      toAccount:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:true,
        index:true
      },
      Status:{
        type:String,
        enum:{values:["PENDING ","SUCCESS","FAILED","CANCELLED","REVERSED","FAILED"],
        message:"Status must be one of PENDING, SUCCESS, FAILED, CANCELLED",
        },
        default:"PENDING",
      },
      amount:{
        type:Number,
        required:true,
        min:0,
      },
    idempotencyKey:{
        type:String,
        required:true,
        unique:true,
    }


},{
    timestamps:true,
})


const TransactionModel= mongoose.model("Transaction",transactionSchema);
module.exports={
    TransactionModel
}