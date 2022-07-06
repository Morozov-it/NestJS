import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  //в импорты добавлять все модели, с которыми взаимодействует модуль
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  //при экспорте модуля будет экспортироваться и сервис
  exports: [
    RolesService
  ]
})
export class RolesModule {}
