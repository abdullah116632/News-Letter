import bcrypt from "bcrypt";

const compareString = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

export default compareString;
