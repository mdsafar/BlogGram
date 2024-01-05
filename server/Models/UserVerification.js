import mongoose from "mongoose";
import bcrypt from "bcrypt"

const verificationSchema = new mongoose.Schema({
   user:{
    type:String,
    required:true
   },
   token:{
    type:String,
    required:true
   },
   createdAt:{
    type:Date,
    expires:3600,
    default:Date.now()
   }
})

verificationSchema.pre('save', async function(next){
   if(!this.isModified("token")){
    next()
   }
   const salt = await bcrypt.genSalt(10)
   this.token = await bcrypt.hash(this.token,salt)
})

verificationSchema.methods.matchToken = async function (token){
    return await bcrypt.compare(token,this.token)
}

const verificationToken = mongoose.model("verification",verificationSchema)

export default verificationToken