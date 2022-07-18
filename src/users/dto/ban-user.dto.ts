import { ApiProperty } from "@nestjs/swagger"

export class BanUserDto {
    //декоратор для swagger
    @ApiProperty({ example: 'For abusing', description: "Reason of user'ban"})
    readonly banReason: string

    //декоратор для swagger
    @ApiProperty({ example: '123', description: 'Id of user'})
    readonly userId: number
}