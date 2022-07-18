import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
            await user.$set('roles', [role.id])

            const userWithRole = await this.userModel.findOne({ where: { email: dto.email }, include: Role })
            console.log(userWithRole)
            
            return userWithRole
        } catch (e) {
            throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllUsers() {
        //include all - подтягиваются все модели, с которыми связана модель User
        const users = await this.userModel.findAll({ include:  Role })
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ where: { email }, include: { all: true } })
        return user
    }
}