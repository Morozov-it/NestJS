import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    //dependency injection
    constructor(private authService: AuthService) { }

    //декораторы для swagger
    @ApiOperation({ summary: 'Log in' })
    @ApiResponse({ status: 200, schema: {type: 'object', properties: { token: {type: 'string' }}}})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    //декораторы для swagger
    @ApiOperation({ summary: 'Registration' })
    @ApiResponse({ status: 200, schema: {type: 'object', properties: { token: {type: 'string' }}}})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
