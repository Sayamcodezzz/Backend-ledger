const accountModel = require("../models/account.model");
const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const emailService = require("../services/email.service");
const mongoose=require("mongoose");
async function createTransactionController(req, res) {

    /**
     * 1.Validate request.......... 
     */
    const { fromAccount, toAccount, amount, type, idempotencyKey } = req.body;
    if (!fromAccount || !toAccount || !amount || !type || !idempotencyKey) {
        return res.status(400).json({
            message: "Missing required fields",
        });
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    });
    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Account not found",
        })
    }


    /**
     * 2.Validate idempotency key\
     * 
     */


    const isTransactionExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey,
    })
    if (isTransactionExists) {
        if (isTransactionExists.status === "COMPLETED") {
            return res.status(200).json({
                message: "Transaction already completed"
            });
        }

        if (isTransactionExists.status === "PENDING") {
            return res.status(200).json({
                message: "Transaction is still processing"
            })
        }

        if (isTransactionExists.status === "FAILED") {
            return res.status(500).json({
                message: "Transaction failed, please try again"
            })
        }

        if (isTransactionExists.status === "CANCELLED") {
            return res.status(500).json({
                message: "Transaction was cancelled"
            });
        }
        if (isTransactionExists.status === "REVERSED") {
            return res.status(500).json({
                message: "Transaction was reversed , please retry"
            });


        }

    }

     /**
     * 3.Check account status
     */
    
     if(fromUserAccount.status !=="ACTIVE " ||toUserAccount.status!=="ACTIVE" ){
        return res.status(400).json({
            message:"Account need to be active to perform transaction",
        })
     } 


     /**
      * 4.validate sender balance  
      */



     const balance = await fromUserAccount.getBalance();
     if(balance<amount){
        return res.status(400).json({
            message:`Insufficient balance . Current balance is ${balance} ,
             Requested balance is ${amount}`,
        })





     /**
      * 5.Create transaction (Pending )
      */



     }








}


