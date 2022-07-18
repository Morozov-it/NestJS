import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcryptjs'

@Injectable()
export class AuthService {
    //чтобы внедрять сторонний сервис нужен импорт в модуль
    constructor(private userService: UsersService,
        private jwtService: JwtService) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        
        //проверка на существующий адрес
        if (candidate) {
            throw new HttpException('This email is already existed', HttpStatus.BAD_REQUEST)
        }
        
        //шифрование пароля
        const hashPassword = await hash(userDto.password, 2)

        //регистрация нового пользователя c зашифрованным паролем
        const user = await this.userService.createUser({...userDto, password: hashPassword})

        //на клиент возвращается новый токен
        if (user instanceof User) {
            return this.generateToken(user)
        }
    }

    private async generateToken(user: User) {
        const payload = { id: user.id, email: user.email, roles: user.roles }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)

        //проверка введенного пароля
        const passwordEquals = await compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Invalid email or password', HttpStatus: HttpStatus.UNAUTHORIZED})
    }
}
