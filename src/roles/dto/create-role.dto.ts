import { ApiProperty } from "@nestjs/swagger"

//dto - это объект, который не содержит методов и имеет только поля для обмена между клиентом и сервером
export class CreateRoleDto {
    //декоратор для swagger
    @ApiProperty({ example: 'ADMIN', description: "Unique value of role"})
    readonly value: string;

    //декоратор для swagger
    @ApiProperty({ example: 'Crud operations', description: 'Possibilities of the role'})
    readonly description: string;
}