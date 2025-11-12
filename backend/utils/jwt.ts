import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "somesupersecret";

export const generateToken = ( userID: string ) => {
    return jwt.sign({ userID }, JWT_SECRET, { expiresIn: "1h" }); 
};

export const verifyToken = ( token: string ) => {
    return jwt.verify(token, JWT_SECRET);
};
