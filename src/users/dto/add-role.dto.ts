import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber } from "class-validator"

export class AddRoleDto {
    //декоратор для swagger
    @ApiProperty({ example: 'USER', description: 'Role of user' })
    @IsString({ message: 'Must be string' })
    readonly value: string

    //декоратор для swagger
    @ApiProperty({ example: '123', description: 'Id of user' })
    @IsNumber({}, { message: 'Must be number' })
    readonly userId: number
}