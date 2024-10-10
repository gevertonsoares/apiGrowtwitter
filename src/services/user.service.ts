import { prismaConnection } from "../database/prisma.connection";
import bcrypt from "bcrypt"

class UserService {
    //* Método para criar um novo usuário
    public static async createUser(name: string, email: string, username: string, password: string) {
        const existUser = await prismaConnection.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (existUser) {
            throw new Error('Username ou email já cadastrado.');
        }

        let hashearPassword = await bcrypt.hash(password, 6);

        const newUser = await prismaConnection.user.create({
            data: { 
                name,
                email, 
                username, 
                password: hashearPassword
            }
        });

        return newUser;
    }

    // Método para listar usuários com paginação
    public static async listUsers(limit: number, page: number) {
        const users = await prismaConnection.user.findMany({
            skip: limit * (page - 1),
            take: limit,
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                deleted: false
            },
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
            }
        });

        const count = await prismaConnection.user.count({
            where: {
                deleted: false
            }
        });

        return {
            users,
            pagination: {
                limit,
                page,
                count,
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    // Método para buscar um usuário pelo ID
    public static async getUser(id: string) {
        const user = await prismaConnection.user.findUnique({
            where: {
                id: id,
                deleted: false
            },
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
            }
        });

        if (!user) {
            throw new Error('O usuário não existe na base de dados.');
        }

        return user;
    }

    // Método para atualizar um usuário
    public static async updateUser(id: string, email: string, username: string, password: string) {
        const existUser = await prismaConnection.user.findUnique({
            where: {
                id: id,
                deleted: false
            }
        });

        if (!existUser) {
            throw new Error('Usuário não encontrado.');
        }

        const usernameOrEmailExists = await prismaConnection.user.findFirst({
            where: {
                OR: [{ username }, { email }]
            }
        });

        if (usernameOrEmailExists) {
            throw new Error('Email ou username já utilizados.');
        }

        const updatedUser = await prismaConnection.user.update({
            where: { id },
            data: { email, username, password }
        });

        return updatedUser;
    }

    // Método para deletar um usuário
    public static async deleteUser(id: string) {
        const existUser = await prismaConnection.user.findUnique({
            where: { id, deleted: false }
        });

        if (!existUser) {
            throw new Error('Usuário não encontrado.');
        }

        const deletedUser = await prismaConnection.user.update({
            where: { id },
            data: {
                deleted: true,
                deletedAt: new Date(),
            }
        });

        return deletedUser;
    }
}

export default UserService;


