import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) { }
    
    //декораторы для swagger
    @ApiOperation({ summary: 'Creating new role' })
    @ApiResponse({ status: 200, type: Role })
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

    //декораторы для swagger
    @ApiOperation({ summary: 'Fetching one role' })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:value')
    getOne(@Param('value') value: string) {
        //получение данных из пaраметров строки запроса get
        return this.rolesService.getRoleByValue(value)
    }

}
