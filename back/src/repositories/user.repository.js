import objectSchema from "../schemas/user.schema.js";

export const findEmailRepository = async (email) => {
  const data = await objectSchema.findOne({
    email: email,
  });
  return data;
};

export const getByUserNameRepository = async (username) => {
  const data = await objectSchema.findOne({
    username: username,
  });
  return data;
};

export const findAllUsersRepository = async (offset, limit, query) => {
  const data = objectSchema
    .find(query)
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
  return data;
};

export const findUserByIdRepository = async (_id) => {

  const data = await objectSchema.findById(_id);
  return data;

}

export const countNewsRepository = async () => {
  const data = objectSchema.countDocuments();
  return data;
};

export const insertUserRepository = async ({
  name,
  surname,
  address,
  complement,
  email,
  username,
  password,
}) => {
  const data = await objectSchema.create({
    name,
    surname,
    address,
    complement,
    email,
    username,
    password,
  });

  return data;
};

export const updateUserRepository = async (
  _id,
  name,
  surname,
  address,
  complement,
  email,
  username,
  password) => {
  const data = await objectSchema.findOneAndUpdate(
    { _id },
    {
      name,
      surname,
      address,
      complement,
      email,
      username,
      password
    }
  );

  return data;
}

export const deleteUserByIdRepository = async (_id) => {
  const data = await objectSchema.findByIdAndDelete(_id);
  return data;
}