//dto - это объект, который не содержит методов и имеет только поля для обмена между клиентом и сервером
export class CreateUserDto {
    readonly email: string
    readonly password: string
}  