import bcrypt from "bcrypt";

const hashString = async (str) => {
    return await bcrypt.hash(str, 10);
}

export default hashString;