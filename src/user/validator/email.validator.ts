import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {
    constructor(private userRepository: UserRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const user = await this.userRepository.findEmail(value)
        return !user
    }
}

export const EmailUnique = (options: ValidationOptions) => {
    return (object: Object, properties: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: properties,
            options: options,
            constraints: [],
            validator: EmailValidator
        })
    }
}