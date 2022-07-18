import { ApiProperty } from "@nestjs/swagger"

export class AddRoleDto {
    //декоратор для swagger
    @ApiProperty({ example: 'USER', description: 'Role of user'})
    readonly value: string

    //декоратор для swagger
    @ApiProperty({ example: '123', description: 'Id of user'})
    readonly userId: number
}