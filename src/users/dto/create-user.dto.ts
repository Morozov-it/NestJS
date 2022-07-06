import { ApiProperty } from "@nestjs/swagger"

//dto - это объект, который не содержит методов и имеет только поля для обмена между клиентом и сервером
export class CreateUserDto {
    //декоратор для swagger
    @ApiProperty({ example: 'user@email.com', description: 'Email address of user'})
    readonly email: string

    //декоратор для swagger
    @ApiProperty({ example: '123', description: 'Password of user'})
    readonly password: string
}