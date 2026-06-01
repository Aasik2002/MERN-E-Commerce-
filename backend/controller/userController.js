import User from "../Models/UserModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "temp_id",
      url: "temp_url",
    },
  });
  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user,
  });
};