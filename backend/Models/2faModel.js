const mongoose = require("mongoose")

const twoFactorSchema = new mongoose.Schema(
    {
        userId : 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        twoFactorSecret:
        {
            type:Object,
            required:true
        },
      

    }
)

const TwoFactor = mongoose.model('TwoFactor',twoFactorSchema)
module.exports=TwoFactor