const mongoose =require("mongoose");

const Schemarules={
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLenght:[4,"legth should be atleast 4"],// [] make this to show your own error
    },
    confirmPassword:{
        type:String,
        required:true,
        // custom validation
        // [] make this to show your own error
        validate: [function(){
            return this.password==this.confirmPassword;
        },"password should be equal to confirmpassword"]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    isPremium:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        enum:["Student","Admin","Teacher"],
        default:"Student",
    },
    profile_picture:{
        type:String,
        default:''
    },

    otp:{
        type:String,
    },
    otpExpiry:{
        type:Date
    },
    
}


const UserSchema = new mongoose.Schema(Schemarules)


UserSchema.pre("save", async function(next){
    const user = this;
    const password = user.password;
    const confirmPassword = user.confirmPassword;
    if (password == confirmPassword) {
        // delete user.confirmPassword
        // user.password = await bcrypt.hash(password, 10);
        next();
    } else {
        const err = new Error("Password and confirmPassword are not the same ")
        next(err)
    }
})

// schema-> structure and validation 
// UserSchema.pre("save", function (next) {
//     const user = this;
//     if (user.role) {
//         const isValid = validCategories.includes(user.role);
//         if (isValid) {
//             next();
//         } else {
//             return next(err);
//         }
//     } else {
//         user.role = "user";
//         next();
//     }

// })

const UserModel= mongoose.model("CodexUser",UserSchema);

module.exports= UserModel;