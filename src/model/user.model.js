const mongoose = require("mongoose");
const bcrypt = require ("bcryptjs")
const userSchema=new mongoose.Schema({
    email:{
        type:String ,
        required:[true,"Email is required  for creating user"],
        trim:true,
        lowercase:true,
        match:[
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Invalid Email Address"
        ],
        unique:true,
    },
    name:{
        type:String,
        required:[true,"Name is required for creating user"],
        unique:true,
    },
    password:{
        type:String ,
        required:[true, "Password is required for creating user "],
        minlength:[6,"password should be contain more than 6 character"],
        select:false,

    }
},
{
    timestamps:true,
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    const hash = await bcrypt.hash(this.password,10);
    this.password=hash;
      return next();
})

userSchema.methods.comparePassword= async function (password) {
    return await bcrypt.compare(password,this.password)
}

const userModel= mongoose.model("user",userSchema);

module.exports=userModel