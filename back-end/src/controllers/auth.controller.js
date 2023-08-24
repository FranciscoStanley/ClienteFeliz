import { loginService } from "../services/auth.service.js";

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await loginService(username, password);
    return res.status(200).json({
      data: token,
    });
  } catch (error) {
    res.status(401).json({
      data: error.message,
    });
  }
};
