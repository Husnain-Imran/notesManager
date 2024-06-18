const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const TwoFactor = require("../Models/2faModel");
// const user = require("../Models/UserModel");    
const expressAsyncHandler = require('express-async-handler');
const User = require("../Models/userModel")

const register2fa = expressAsyncHandler(async (req, res ,next) => {

    const  userId = req.body.user.userId;

    try
    {
        const secret = speakeasy.generateSecret({ name:"nano note" });
       
        let twoFactor = await TwoFactor.findOne({ userId: userId });

        if(!twoFactor)
            {
                twoFactor =new TwoFactor({
                    userId:userId,
                    twoFactorSecret:secret,
                  
                    
                })
               
                
            }else
            {
                twoFactor.twoFactorSecret = secret;
                
            }
            await twoFactor.save();

         
            QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
              if (err) {
                next(err);
              }
              res.json({
                QRCode: data_url,
                secret: secret.base32,
              });
            });

    }
    catch(error)
    {
        next(error)
    }   


})
const verify = expressAsyncHandler(async (req, res, next) => {
     const user = await User.findById({_id:req.body.user.userId});
     console.log("user",user)
  const userId = req.body.user.userId;
  const { token } = req.body;

  try {
    const twoFactor = await TwoFactor.findOne({ userId: userId });

    if (!twoFactor) {
      return next("2FA not enabled for this user");
    }

    console.log("Retrieved twoFactor:", twoFactor);
    console.log("Token received:", token);

    const verified = speakeasy.totp.verify({
      secret: twoFactor.twoFactorSecret.ascii,
      encoding: "ascii",
      token,
    });

    console.log("Verification result:", verified);

    if (verified) {
         user.is2FAEnabled = true;
         await user.save()
      res.json({ success: true  });
      console.log("is user",user)
    } else {
      return next("Invalid token");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return next(error);
  }
});

module.exports = {register2fa ,verify}