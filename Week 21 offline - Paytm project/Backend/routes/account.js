const express = require("express");
const authMiddleware = require("../middleware");
const { AccountModel, UserModel } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req,res)=>{
    const account = await AccountModel.findOne({userId: req.userId});

    res.status(200).json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const {to, amount} = req.body;

    const senderAccount = await AccountModel.findOne({userId: req.userId});

    if(senderAccount.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance!"
        })
    }

    const receiverAccount = await AccountModel.findOne({userId: to});

    if(!receiverAccount){
        return res.status(400).json({
            message: "Invalid receiver account!"
        })
    }

    await AccountModel.updateOne({userId: req.userId},{$inc: {balance: -amount}})
    await AccountModel.updateOne({userId: to},{$inc: {balance: +amount}})

    await session.commitTransaction();
    
    res.json({
        message: "Transaction successful!"
    })
})

module.exports = router