import objectSchema from "../schemas/user.schema.js";

export const loginRepository = async (username) => {
  const response = await objectSchema
    .findOne({ username: username })
    .select("+password");
  return response;
};
