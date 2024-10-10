import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public static async login(req: Request, res: Response) {
    try {
      const { usernameOrEmail, password } = req.body;

      const { token, userLogged } = await AuthService.login(
        usernameOrEmail,
        password
      );

      return res.status(200).json({
        ok: true,
        message: "Usuário autenticado com sucesso.",
        token,
        user: userLogged,
      });
    } catch (err) {
      return res.status(401).json({
        ok: false,
        message: `Credenciais inválidas ou Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
          (err as Error).message
        }`,
      });
    }
  }

  public static async logout(req: Request, res: Response) {
    try {
      return res.status(200).json({
        ok: true,
        message: "Logout realizado com sucesso.",
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${
          (err as Error).message
        }`,
      });
    }
  }
}
