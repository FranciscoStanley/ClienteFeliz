import bcrypt from "bcrypt";
import { generateTokenService } from "../services/auth.service.js";
import {
  findEmailRepository,
  insertUserRepository,
  findAllUsersRepository,
  countNewsRepository,
  findUserByIdRepository,
  getByUserNameRepository,
  updateUserRepository,
  deleteUserByIdRepository,
} from "../repositories/user.repository.js";

export const listAllUsersService = async (_id, name, surname, offset, limit, currentUrl, query = {}) => {
  offset = parseInt(offset);
  limit = parseInt(limit);

  if (!offset) {
    offset = 0;
  }

  if (!limit) {
    limit = 5;
  }

  if (_id) {
    Object.assign(query, { _id: _id })
  }

  if (name) {
    Object.assign(query, { name: { $regex: new RegExp(name, "i") } })
  }

  if (surname) {
    Object.assign(query, { surname: { $regex: new RegExp(surname, "i") } })
  }

  const users = await findAllUsersRepository(offset, limit, query);

  const total = await countNewsRepository();
  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
  const previous = offset - limit < 0 ? null : currentUrl;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  return {
    meta: {
      message: "Get users success",
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
    },

    results: users.map((user) => ({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      address: user.address,
      complement: user.complement,
      email: user.email,
      username: user.username,
    })),
  };
};

export const getEmailService = async (email) => {
  const response = await findEmailRepository(email);
  return response;
};

export const insertUserService = async ({
  name,
  surname,
  address,
  complement,
  email,
  username,
  password,
}) => {
  if (
    !name ||
    !surname ||
    !address ||
    !complement ||
    !email ||
    !username ||
    !password
  ) {
    throw new Error("Submit all fields for registration");
  }

  const hasUserEmail = await getEmailService(email);

  if (hasUserEmail) {
    throw new Error("This user email is already in use!");
  }

  const hasUserName = await getByUserNameRepository(username)

  if (hasUserName) {
    throw new Error("This username is already in use!")
  }

  const user = await insertUserRepository({
    name,
    surname,
    address,
    complement,
    email,
    username,
    password,
  });

  if (!user) {
    throw new Error("Error creating User!");
  }

  const token = generateTokenService(user._id);
  return { token };
};

export const updateUserService = async (
  { name, surname, address, complement, email, username, password },
  userId,
  userIdLogged
) => {
  if (!name || !surname || !address || !complement || !email || !username || !password) {
    throw new Error("Submit at least one field to update the user");
  }

  const user = await findUserByIdRepository(userId);

  if (String(user._id) !== String(userIdLogged)) {
    throw new Error("You cannot update this user");
  }

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  await updateUserRepository(
    userId,
    name,
    surname,
    address,
    complement,
    email,
    username,
    password
  );

  return { message: "User successfully updated!" }

};

export const deleteUserService = async (_id, userId) => {

  const user = await findUserByIdRepository(userId);

  if (!user) {
    throw new Error("User not found!")
  }

  await deleteUserByIdRepository(_id);

  return { message: "User deleted successfully!" }

};
