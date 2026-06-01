import User from "../Models/UserModel.js";

// ✅ Added 'next' parameter to handle error middleware smoothly
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation check for incoming Postman payload
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter all required fields (name, email, password)" 
      });
    }

    // 2. Check if user already exists in your local MongoDB
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists with this email" 
      });
    }

    // 3. Create the user database document
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "temp_id",
        url: "temp_url",
      },
    });

    // Remove password string explicitly before returning the server response JSON
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Added 'next' parameter here as well
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter email and password" 
      });
    }

    // Explicitly pulls the hidden password field using .select("+password")
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    // Uses the custom method we built into your schema file
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    // Prevent displaying the encrypted password string in Postman response window
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user
    });
  } catch (error) {
    next(error);
  }
};