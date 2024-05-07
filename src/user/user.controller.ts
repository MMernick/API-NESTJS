import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { createDTO } from "./dto/create.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid';
import { UserDTO } from "./dto/user.dto";
import { updateDTO } from "./dto/update.dto";

@Controller('/users')
export class userController {
    constructor(private userRepository: UserRepository) {}

    @Post()
    async create(@Body() data: createDTO) {
        const userEntity = new UserEntity()

        userEntity.id = uuid()
        userEntity.nome = data.nome
        userEntity.email = data.email
        userEntity.senha = data.senha

        this.userRepository.create(userEntity)
        return {status: 'success', data: new UserDTO(
            userEntity.id,
            userEntity.nome
        )}
    }

    @Get()
    async all() {
        const users = await this.userRepository.all()
        return users.map(
            users => new UserDTO(
                users.id,
                users.nome
            )
        )
    }

    @Put('/:id')
    async update(@Param('id') id: String, @Body() data: updateDTO){
        const userUpdated = await this.userRepository.update(id, data);

        return {
            status: 'success',
            message: 'Usuário Atualizado com Sucesso',
            data: userUpdated
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: String){
        const userUpdated = await this.userRepository.delete(id);

        return {
            status: 'success',
            message: 'Usuário Removido com Sucesso',
            data: userUpdated
        }
    }
}