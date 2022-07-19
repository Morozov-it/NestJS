import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

//dto - это объект, который не содержит методов и имеет только поля для обмена между клиентом и сервером
export class CreatePostDto {
    //декоратор для swagger
    @ApiProperty({ example: 'title', description: 'Title of post' })
    @IsString({ message: 'Must be string' })
    readonly title: string

    //декораторы для валидации
    @ApiProperty({ example: 'content', description: 'Content of post' })
    @IsString({ message: 'Must be string' })
    readonly content: string
}