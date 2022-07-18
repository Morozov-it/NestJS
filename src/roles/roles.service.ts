import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    //внедрение зависимости в класс сервиса
    constructor(@InjectModel(Role) private roleModel: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        try {
            //создание новой записи в бд
            const role = await this.roleModel.create(dto)
            return role
        } catch (e) {
            return new Error(e.message)
        }
    }

    async getRoleByValue(value: string) {
        const role = await this.roleModel.findOne({ where: { value } })
        return role
    }
}
