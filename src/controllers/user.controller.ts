import { Request, Response } from "express";
import  UserService  from "../services/user.service";

export class UserController {
    public static async create(req: Request, res: Response) {
        try {
            const { name, email, username, password } = req.body;
            const newUser = await UserService.createUser(name, email, username, password);

            return res.status(201).json({
                ok: true,
                message: 'Usuário cadastrado com sucesso!',
                user: newUser,
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }
    

    public static async list(req: Request, res: Response) {
        try {
            const { limit = 10, page = 1 } = req.query;
            const userList = await UserService.listUsers(Number(limit), Number(page));

            return res.status(200).json({
                ok: true,
                message: "Usuários listados com sucesso",
                ...userList
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }

    public static async get(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.getUser(id);

            return res.status(200).json({
                ok: true,
                message: "Usuário encontrado",
                user
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }


    public static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { email, username, password } = req.body;
            const updatedUser = await UserService.updateUser(id, email, username, password);

            return res.status(200).json({
                ok: true,
                message: "Usuário atualizado com sucesso",
                user: updatedUser
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }


    public static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedUser = await UserService.deleteUser(id);

            return res.status(200).json({
                ok: true,
                message: "Usuário deletado com sucesso.",
                user: deletedUser
            });
        } catch (err) {
            return res.status(404).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }

}