import bcrypt from "bcryptjs";

export const generateSalt = async () => {
    return await bcrypt.genSalt(10);
};

export const hashPassword = async ( password: string, salt: string ) => {
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async ( password: string, hashedPassword: string ) => {
    return await bcrypt.compare(password, hashedPassword);
};