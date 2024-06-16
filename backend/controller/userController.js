const User = require("../Models/userModel");
const getUser = async (req, res) => {
  try {
    console.log("req",req.body)
    const user = await User.findOne({ _id: req.body.user.userId });
    console.log("user",user )
    user.password = undefined;
    if (!user) {
      return res.status(404).json({ message: "User not found" ,success:false});
    }
    else
    {
        res.json({ data:user ,success:true});
    }
  } catch (error) {
    res.status(500).json({ message: error.message,success:false });
  }
};
module.exports = getUser;