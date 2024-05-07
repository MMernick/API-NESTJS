import { Module } from "@nestjs/common";
import { userController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { EmailValidator } from "./validator/email.validator";

@Module({
    controllers: [userController],
    providers: [UserRepository, EmailValidator]
})

export class UserModule {}