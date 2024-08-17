import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userScheme = mongoose.Schema({
   name: {
    type: String,
    required: true
   } ,
    email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']

   } ,
    password: {
    type: String,
    required: true
   } ,
}, {timestamps: true});

userScheme.pre('save', async function(next) {
 if(!this.isModified('password')) {
     next();
 }

 const salt = await bcrypt.genSalt(10); 
 this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userScheme);

export default User;