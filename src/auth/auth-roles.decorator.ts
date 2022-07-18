import { SetMetadata } from "@nestjs/common"


export const ROLES_KEY = 'roles'

//декоратор для передачи ролей
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)