import { prismaConnection } from "../database/prisma.connection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthService {
    public static async login(usernameOrEmail: string, password: string) {
        try {
            const userFound = await prismaConnection.user.findFirst({
                where: {
                    OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
                    deleted: false,
                },
            });
    
            if (!userFound) {
                throw new Error("Credenciais inválidas.");
            }
    
            const passwordCompare = await bcrypt.compare(password, userFound.password);
    
            if (!passwordCompare) {
                throw new Error("Credenciais inválidas.");
            }
    
            const token = jwt.sign(
                { id: userFound.id, username: userFound.username },
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.JWT_EXPIRATION }
            );
    
            return {
                token,
                userLogged: userFound,
            };

        } catch (error) {
            throw new Error(`Erro ao criar o like: ${(error as Error).message}`);
        }
    }
}
