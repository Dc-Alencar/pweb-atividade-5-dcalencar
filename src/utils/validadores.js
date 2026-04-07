import { AppError } from "./appError.js";

export function validarID(id){
        if(!id || isNaN(id) || id < 0){
            throw new AppError("ID inválido!!!", 400);
        };
    }

export function validarCPF(cpf){
    const cpfLimpo = String(cpf).replace(/[^\d]/g, '');
    return cpfLimpo.length === 11;
}