
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Driver = require("../models/Driver");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const sendVerificationEmail = (user, token) => {
  const url = `http://localhost:5000/api/v1/verify-email?token=${token}`;
  transporter.sendMail({
    to: user.email,
    subject: 'Verify your email',
    html: `Click <a href="${url}">here</a> to verify your email.`
  });
};

const register = async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (foundUser === null) {
      let { username, email, password } = req.body;
      if (username && email && password) {
        const client = new User({
          name: username,
          email: email,
          password: password,
          role: "client"
        });
        const token = client.createVerificationToken();
        await client.save();
        sendVerificationEmail(client, token);
        return res.status(201).json({ msg: "Please verify your email to complete registration" });
      } else {
        return res.status(400).json({ msg: "Please add all values in the request body" });
      }
    } else {
      return res.status(400).json({ msg: "Email already in use" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
};

// const verifyEmail = async (req, res) => {
//   const { token } = req.query;
//   const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
//   const user = await User.findOne({
//     verificationToken: hashedToken,
//     verificationTokenExpiry: { $gt: Date.now() }
//   });
  
//   if (!user) {
//     return res.status(400).json({ msg: 'Token is invalid or has expired' });
//   }

//   user.isVerified = true;
//   user.verificationToken = undefined;
//   user.verificationTokenExpiry = undefined;
//   await user.save();

//   res.status(200).json({ msg: 'Email verified successfully' });
// };
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Rechercher l'utilisateur ou le conducteur avec le token de vérification
    let user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      user = await Driver.findOne({
        verificationToken: hashedToken,
        verificationTokenExpiry: { $gt: Date.now() }
      });
    }

    if (!user) {
      return res.status(400).json({ msg: 'Token is invalid or has expired' });
    }

    // Mettre à jour l'utilisateur pour marquer le compte comme vérifié
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ msg: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  let foundDriver = await Driver.findOne({ email: req.body.email });

  let user = foundUser || foundDriver;
  if (user) {
    if (!user.isVerified) {
      return res.status(400).json({ msg: 'Please verify your email before logging in' });
    }

    const isMatch = await user.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: user._id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      return res.status(200).json({ msg: "user logged in", token, role: user.role });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentials" });
  }
};

const getAllUsers = async (req, res) => {
  let users = await User.find({});

  return res.status(200).json({ users });
};

// Contrôleur pour récupérer tous les conducteurs
const getAllDrivers = async (req, res) => {
  let drivers = await Driver.find({});
  return res.status(200).json({ drivers });
};



const registerDriver = async (req, res) => {
  try {
    let foundDriver = await Driver.findOne({ email: req.body.email });
    if (foundDriver === null) {
      let { username, email, password, cin, taxiId } = req.body;
      if (username && email && password && cin && taxiId) {
        const driver = new Driver({
          name: username,
          email: email,
          password: password,
          cin: cin,
          taxiId: taxiId,
          role: "driver"
        });
        const token = driver.createVerificationToken();
        await driver.save();
        sendVerificationEmail(driver,token);
        return res.status(201).json({ msg: "Please verify your email " });
      } else {
        return res.status(400).json({ msg: "Please add all values in the request body" });
      }
    } else {
      return res.status(400).json({ msg: "Email already in use" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
};


module.exports = {
  login,
  register,
  registerDriver,
  getAllUsers,
  getAllDrivers,
  verifyEmail
};


