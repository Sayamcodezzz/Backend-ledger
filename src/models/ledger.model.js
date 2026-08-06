const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
        account:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"account",
            required:true,
            index:true,
            immutable:true,

        },
        amount:{
            type:Number,
            required:true,
            min:0,
            immutable:true,
            required:true,
        },
      transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction",
        required:true,
        index:true,
        immutable:true,
      },
      type:{
        enum:{
            values:["CREDIT","DEBIT"],
            message:"Type must be either CREDIT or DEBIT",
        },
        required:true,
        immutable:true,
      }
})


function preventLedgerModification(){
    throw new Error("Ledger entries are immutable and cannot be modified or deleted");
}

ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("remove", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);
ledgerSchema.pre("replaceOne", preventLedgerModification);




const ledgerModel=mongoose.model("ledger",ledgerSchema);

module.exports={
    ledgerModel,
}