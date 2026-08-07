export const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body; 
    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};