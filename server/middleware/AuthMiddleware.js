const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Token is Missing",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const verifyFacultyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Token is Missing",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (decode.role !== "FACULTY") {
      return res.status(404).json({
        ok: false,
        message: "User is UnAuthroized",
      });
    }
    req.user = decode;
    next();
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Token is Missing",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    
    if (decode.role !== "ADMIN") {
      return res.status(404).json({
        ok: false,
        message: "User is UnAuthroized",
      });
    }

    req.user = decode;
    next();
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};


const verifyOfficials = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        ok: false,
        message:"Token is missing"
      })
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (decode.role === "STUDENT") {
      return res.status(401).json({
        ok: false,
        message:"You are un-Authorized"
      })
    }
    req.user = decode;
    next();
  } catch (err) {
    return res.status(500).json({
      ok: false, 
      message: err.message
    })
  }
}

module.exports = { verifyToken, verifyFacultyToken, verifyAdminToken, verifyOfficials };
