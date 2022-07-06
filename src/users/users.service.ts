import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "src/roles/roles.model";
import { RolesService } from "src/roles/roles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
    //внедрение модели
    constructor(@InjectModel(User) private userModel: typeof User,
        private rolesService: RolesService) { }

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userModel.create(dto)
            const role = await this.rolesService.getRoleByValue("USER")

            //метод бд для перезаписи одного поля
            if (role instanceof Role) {
                await user.$set('roles', [role.id])
            }

            const userWithRole = await this.userModel.findOne({ where: { email: dto.email }, include: Role })
            return userWithRole
        } catch (e) {
            return new Error(e.message)
        }
    }

    async getAllUsers() {
        try {
            //include all - подтягиваются все модели, с которыми связана модель User
            const users = await this.userModel.findAll({ include:  Role })
            return users
        } catch (e) {
            return new Error(e.message)
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ where: { email }, include: { all: true } })
        return user
    }
}