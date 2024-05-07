import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"
import { EmailUnique } from "../validator/email.validator"

export class updateDTO {
    @IsNotEmpty({ message: 'O Nome não pode ser vazio' })
    @IsOptional()
    nome: string

    @IsEmail(undefined, { message: 'O Email informado não é valido' })
    @EmailUnique({ message: 'Já existe um usuário com este Email' })
    @IsOptional()
    email: string
    
    @MinLength(6, { message: 'A Senha deve conter pelo menos 6 caracteres' })
    @IsOptional()
    senha: string
}