import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

//используется как middleware для проверки авторизации пользователя
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    //стандартная функция Nest 
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader: string = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            //проверка http-заголовков от клиента
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'User is not authorized', HttpStatus: HttpStatus.UNAUTHORIZED})
            }

            //раскодирование токена
            const user = this.jwtService.verify(token)

            //присваивание данных в запрос
            req.user = user
            return true
        } catch (e) {
            throw new UnauthorizedException({ message: 'User is not authorized', HttpStatus: HttpStatus.UNAUTHORIZED})
        }
    }
}