import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    private findById(id: String){
        const user = this.users.find(user => user.id === id)
        if(!user) throw new Error('Usuário não Existe')

        return user
    }

    async create(data: UserEntity) {
        this.users.push(data)
    }

    async update(id: String, data: Partial<UserEntity>) {
        const user = this.findById(id)

        Object.entries(data).forEach(([key, value]) => {
            if(key === 'id') return
            user[key] = value
        })

        return user
    }

    async delete(id: String) {
        const user = this.findById(id)
        this.users = this.users.filter(user => user.id !== id)

        return user
    }

    async all() {
        return this.users
    }

    async findEmail(email) {
        const user = this.users.find(user => user.email === email)
        return user !== undefined
    }
}