import { generateCodeOfConfirmation, sendMail } from "../services/email.service.js";
import {
  insertUserService,
  listAllUsersService,
  updateUserService,
  deleteUserService,
} from "../services/user.service.js";

export const listController = async (req, res) => {
  try {
    const { _id, name, surname, offset, limit } = req.query;
    const currentUrl = req.baseUrl;

    const users = await listAllUsersService(_id, name, surname, offset, limit, currentUrl, {});
    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      data: error.message,
    });
  }
};

export const insertUserController = async (req, res) => {
  try {
    const { name, surname, address, complement, email, username, password } =
      req.body;

    const user = await insertUserService({
      name,
      surname,
      address,
      complement,
      email,
      username,
      password,
    });

    const link = "http://localhost:3000/user/confirmation/" + generateCodeOfConfirmation()
    
    let emailMessage = {
      from: "system@clientefeliz.com",
      to: email,
      subject: 'Registration verification email',
      body: `Verification ${link}`
    };
    

    await sendMail(emailMessage)

    res.status(201).json({
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      data: error.message,
    });
  }
};

export const updateController = async (req, res) => {
  try {
    const { name, surname, address, complement, email, username, password } =
      req.body;
    const { _id: userId } = req.params;
    const userIdLogged = req.userId;

    const response = await updateUserService(
      { name, surname, address, complement, email, username, password },
      userId,
      userIdLogged
    );
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      data: error.message,
    });
  }
};

export const deleteController = async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.userId;

    await deleteUserService(_id, userId);
    return res.status(200).json({
      message: "User delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      data: error.message,
    });
  }
};
