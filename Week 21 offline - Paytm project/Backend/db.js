const mongoose = require("mongoose");
const { number } = require("zod");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

mongoose.connect("mongodb+srv://sushbh2004:sushant1234@cluster0.byi6a.mongodb.net/paytm-app")

const userSchema = new Schema({
    username: {type:String, required:true, unique: true, trim: true, minLength: 3, maxLength:30},
    password: {type:String, required:true, minLength: 6} ,
    firstName: {type:String, trim:true, required:true, maxLength:60}, 
    lastName: {type:String, trim:true, maxLength:60}
})

const accountSchema = new Schema({
    userId: {type: ObjectId, ref: "user", required: true},
    balance: {type: Number, required: true}
})

const UserModel = mongoose.model("user", userSchema);
const AccountModel = mongoose.model("account", accountSchema);

module.exports = {
    UserModel,
    AccountModel
}