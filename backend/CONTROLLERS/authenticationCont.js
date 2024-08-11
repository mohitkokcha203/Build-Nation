const userDB = require("../SCHEMA/userSchema");
const { success, error } = require("../UTILS/responseWrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signUP controller -----------------signUP controller -----------------signUP controller -----------------signUP controller -----------------
const signupcontroller = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send(error(400, "All Fields Required"));
    }

    const oldUser = await userDB.findOne({ email });
    if (oldUser) {
      return res.send(success(409, "User already exist"));
    }
    // encrypting password by using bcrypt  ------------
    const hashedpass = await bcrypt.hash(password, 10);
    const newUser = await userDB.create({
      name,
      email,
      password: hashedpass,
    });

    const kk ="4106dca21df243556d55c74bb0d6bf3c62dffae28e5252762e721565f6ba584cd926df29d4a720d5a9dc4f3f8926f3b241eca11d4a005ff966d63e9982e9bd20";
    const hash = await bcrypt.hash(kk, 10);
    console.log("adminnn keyyyy =>>>",hash) ;


    const currUser = await userDB.findOne(newUser._id);
    return res.send(success(201, { currUser }));
  } catch (e) {
    return res.send(error(500,e.message));
  }
};

// // //login controller -----------------login controller -----------------login controller -----------------login controller -----------------
const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "All fields required"));
    }

    const User = await userDB.findOne({ email }).select("+password");
    if (!User) {
      return res.send(error(404, "User not found"));
    }

    const matchPassword = await bcrypt.compare(password, User.password);

    if (!matchPassword) {
      return res.send(error(406, "Incorrect password"));
    }
    // calling generate acess/refresh token fuction ========================
    const accessToken = generateAccessToken({ id: User._id });
    const refreshToken = generateRefreshToken({ id: User._id });

    res.cookie("jwtCookie", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, { accessToken }));
  } catch (error) {
    return res.send(error(500,error.message));
  }
};

// // //login controller -----------------  ADMINNNNNNNNNNN  controller -----------------login controller -----------------login controller -----------------
const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(400, "All fields required"));
    }

    const user = await userDB
      .findOne({ email })
      .select("+password")
      .select("+adminKey");
    if (!user) {
      return res.send(error(404, "User not found"));
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.send(error(406, "Invalid access"));
    }
    const key =
      "4106dca21df243556d55c74bb0d6bf3c62dffae28e5252762e721565f6ba584cd926df29d4a720d5a9dc4f3f8926f3b241eca11d4a005ff966d63e9982e9bd20";
    const adminKey = await bcrypt.compare(key, user.adminKey);
    if (!adminKey) {
      return res.send(error(406, "Invalid access Key"));
    }

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    res.cookie("jwtCookie", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, { accessToken }));
  } catch (err) {
    return res.send(error(500,err.message));
  }
};

// logoutController ======== logoutController =============logoutController ======logoutController=========
const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwtCookie", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "User logged out"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
// calling refresh token api for new access token ================
const refreshTokenController = async (req, res) => {
  const refreshCookie = req.cookies.jwtCookie;
  if (!refreshCookie) {
    return res.send(error(401, "Refresh token is required"));
  }
  try {
    const decode = jwt.verify(
      refreshCookie,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );

    const accessToken = generateAccessToken({ id: decode.id });

    return res.send(success(200, { accessToken }));
  } catch (err) {
    return res.send(error(401, "Invalid refresh token"));
  }
};
// generating acess token ========================

function generateAccessToken(data) {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "15m",
  });
  return token;
}

// generating refresh token ========================
function generateRefreshToken(data) {
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: "30d",
  });
  return refreshToken;
}

module.exports = {
  signupcontroller,
  logincontroller,
  adminLoginController,
  refreshTokenController,
  logoutController
};
