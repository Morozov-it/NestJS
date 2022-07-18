import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length, IsEmail } from "class-validator"

//dto - это объект, который не содержит методов и имеет только поля для обмена между клиентом и сервером
export class CreateUserDto {
    //декоратор для swagger
    @ApiProperty({ example: 'user@email.com', description: 'Email address of user' })
    @IsString({ message: 'Must be string' })
    @IsEmail({}, { message: 'Uncorrect email'})
    readonly email: string

    //декораторы для валидации
    @ApiProperty({ example: '123', description: 'Password of user' })
    @IsString({ message: 'Must be string' })
    @Length(4, 16, { message: 'Must be from 4 to 16 symbols'})
    readonly password: string
}