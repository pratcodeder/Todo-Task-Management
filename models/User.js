const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
},
{
    timestamps:true,
}
);

userSchema.methods.comparePassword = async function ( candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;