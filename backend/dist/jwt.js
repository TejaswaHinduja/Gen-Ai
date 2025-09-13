import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtsec = process.env.JWT_SECRET;
export default async function gentoken(userId, res) {
    if (!jwt) {
        return;
    }
    const token = jwt.sign({ id: userId }, jwtsec, {
        expiresIn: "7d"
    });
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });
    return token;
}
//# sourceMappingURL=jwt.js.map