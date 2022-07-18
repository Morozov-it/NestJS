import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/auth-roles.decorator";
import { RolesGuard } from "src/auth/auth-roles.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Role } from "src/roles/roles.model";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    //dependency injection
    constructor(private usersService: UsersService) {}

    //декораторы для swagger
    @ApiOperation({ summary: 'Creating new user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    //декораторы для swagger
    //UseGuards - middleware для проверки авторизации 
    @ApiOperation({ summary: 'Fetching all users' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({ summary: 'Give the role' })
    @ApiResponse({ status: 200, type: [Role] })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }

    @ApiOperation({ summary: 'Ban user' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/ban')
    banUser(@Body() dto: BanUserDto) {
        return this.usersService.banUser(dto)
    }
}