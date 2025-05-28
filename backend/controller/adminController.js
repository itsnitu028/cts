import Users from "../model/Users.js";
import jwt from "jsonwebtoken";

// Admin Signup
export const adminSignup = async (req, res) => {
  try {
    const { email, username, password, mobile, address } = req.body;

    const existingAdmin = await Users.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    const newAdmin = new Users({
      email,
      name: username,
      password,
      mobile,
      address,
      role: "admin", // Important: explicitly set role
    });

    await newAdmin.save();

    const tokenPayload = {
      user: {
        id: newAdmin._id,
        role: newAdmin.role,
      },
    };

    const token = jwt.sign(tokenPayload, "secret");

    res.status(201).json({ success: true, token, currUser: newAdmin.name });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
};
