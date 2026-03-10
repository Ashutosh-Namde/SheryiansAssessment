const userModel = require("../models/userModel");

const profileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    // console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "error in profile data" });
  }
};

module.exports = profileController;
