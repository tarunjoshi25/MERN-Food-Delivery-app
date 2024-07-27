const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  // console.log(req.body)
  // res.json("post success");
  const { email, password, name } = req.body;
  const emailExists = await UserModel.findOne({ email: email });
  if (emailExists) {
    return res.status(400).send("User Already Exists");
  }
  const salt = await bcrypt.genSalt(10); // here we are using bcrypt to encrypt the users email and password details
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    // here we have added users details in encypted form in user collection inside database
    name: name,
    email: email,
    password: hashPassword,
  });

  const savedUser = newUser.save();

  // create payload then Generate an access token

  const token = jwt.sign({ userID: savedUser._id }, "randomsecret");
  return res.status(200).json({
    user: newUser,
    token: token,
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).send("User does not exist");
  }

  const isPasswordMatchingFromDb = await bcrypt.compare(
    password,
    user.password
  );

  if (isPasswordMatchingFromDb) {
    const token = jwt.sign({ userId: user._id }, "randomsecret");
    return res.status(200).json({
      user: user,
      token: token,
    });
  }

  return res.status(401).send("Incorrect login credentials");
};
module.exports = { userRegister, userLogin };
