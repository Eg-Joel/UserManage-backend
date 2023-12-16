const AddUser = require("../models/addUser");


exports.addUsers = async (req, res, next) => {
  try {
    const { username, email, phone } = req.body;
    console.log(req.body);
    const newUser = new AddUser({ username, email, phone });
    await newUser.save();
    res.status(201).json("user created successsfully");
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {

    const { filter } = req.query

     let users;
    if (filter === "lastModified") {
      users = await AddUser.find().sort({ updatedAt: -1 });
    } else if (filter === "lastInserted") {
      users = await AddUser.find().sort({ createdAt: -1 });
    } else {

      users = await AddUser.find();
    }

     
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await AddUser.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({success: false,  message: 'User not found' });
    }
    const updatedUsers = await AddUser.find();
    res.status(200).json({  success: true,message: 'User deleted successfully',users: updatedUsers });
  } catch (error) {
    next(error);
  }
};

exports.editUser = async (req, res, next) => {
  try {
   
    const { userId } = req.params; 
    
    const user = await AddUser.findById(userId)
    if(!user){
      return res.status(400).json({success: false, message:"user dose not found"})
  }
  user.set(req.body)
const updateUser = await user.save()
  res.status(200).json({  success: true,message: 'User edited successfully',users: updateUser });
  } catch (error) {
    next(error);
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    
    const { value } = req.params; 
  
    const users = await AddUser.find({
      $or: [
        { username: { $regex: value,$options: "i" }},
         { email: { $regex: value,$options: "i"   }},
        ],
        
    });
  
 

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
