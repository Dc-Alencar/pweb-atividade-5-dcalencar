import { AppError } from "../utils/appError.js";

export const middlewareDeErro = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({erro: err.message})
    }

    console.error(err);
    res.status(500).json ({erro: "Ocorreu um erro interno no servidor!!"});
}