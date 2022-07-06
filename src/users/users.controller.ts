import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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
    @ApiOperation({ summary: 'Fetching all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }
}