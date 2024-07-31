const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  try {
    // check if there is a value of firstName, lastName, userName, email or password coming from the frontend
    if (!firstName || !lastName || !userName || !email || !password) {
      throw new Error("All credentials must be included!");
    }

    // check if there is a user created with the email already
    const userWithEmail = await userModel.findOne({ email });
    if (userWithEmail) {
      throw new Error("Account already created, log in instead");
    }

    // check if there is a user created with the username already
    const userWithUserName = await userModel.findOne({ userName });
    if (userWithUserName) {
      throw new Error("Username already chosen, use another one instead");
    }

    // check if the password is at least 8 characters long
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = await userModel.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if there is email and password coming from the frontend
    if (!email || !password) {
      throw new Error("Email and Password must be included");
    }

    // get the user from the database
    const user = await userModel.findOne({ email });

    // if we are not able to get a user, send an error message
    if (!user) {
      throw new Error("There is no account with this email, Sign up instead");
    }

    // if there is a user, check if the input password matches the previous password
    const matchedPassword = await bcrypt.compare(password, user.password);

    //  if password does not match, send an error message
    if (!matchedPassword) {
      throw new Error("Incorrect password");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

const ChangePassword = async (req, res) => {
  //
};

const Logout = async (req, res) => {
  //
};

const UpdateProfile = async (req, res) => {
  //
};

module.exports = { Signup, Login, ChangePassword, Logout, UpdateProfile };
