import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./auth-roles.decorator";

//используется как middleware для проверки роли пользователя
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}//для использования декоратора с ролями
    
    //стандартная функция Nest 
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles) {
                return true
            }

            return req.user.roles.some((role) => requiredRoles.includes(role.value))
        } catch (e) {
            throw new HttpException('Out of access', HttpStatus.FORBIDDEN)
        }
    }
}