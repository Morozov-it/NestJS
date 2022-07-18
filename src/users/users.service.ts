import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "src/roles/roles.model";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
    //внедрение модели
    constructor(@InjectModel(User) private userModel: typeof User,
        private rolesService: RolesService) { }

    async getAllUsers() {
        //include all - подтягиваются все модели, с которыми связана модель User
        const users = await this.userModel.findAll({ include:  Role })
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ where: { email }, include: { all: true } })
        return user
    }    

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userModel.create(dto)
            const role = await this.rolesService.getRoleByValue("USER")

            //метод бд для перезаписи одного поля
            await user.$set('roles', [role.id])

            const userWithRole = await this.userModel.findOne({ where: { email: dto.email }, include: Role })
            
            return userWithRole
        } catch (e) {
            throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST)
        }
    }

    async addRole(dto: AddRoleDto) {
        //получение пользователя и нужной роли из бд 
        const user = await this.userModel.findByPk(dto.userId) //find by personal key
        const role = await this.rolesService.getRoleByValue(dto.value)

        if (!user || !role) {
            throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
        }

        //метод бд для добавления данных в поле
        await user.$add('roles', role.id)

        const userWithAddRole = await this.userModel.findOne({ where: { id: dto.userId }, include: Role })

        return userWithAddRole
    }

    async banUser(dto: BanUserDto) {
        //получение пользователя и нужной роли из бд 
        const user = await this.userModel.findByPk(dto.userId) //find by personal key

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        //еще способ изменения полей элемента в бд
        user.banned = true
        user.banreason = dto.banReason
        await user.save()

        return user
    }
}