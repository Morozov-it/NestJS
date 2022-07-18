import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "src/auth/auth.module";
import { Role } from "src/roles/roles.model";
import { RolesModule } from "src/roles/roles.module";
import { UserRoles } from "src/roles/user-roles.model";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@Module({
    //контроллеры для работы с endpoints
    controllers: [UsersController],
    //сервисы с логикой взаимодействия с бд
    providers: [UsersService],
    //импорт модели из бд и нужного модуля
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles]),
        RolesModule,
        //для предотвращения кольцевой зависимости
        forwardRef(() => AuthModule)
    ],
    //при экспорте модуля будет экспортироваться и сервис
    exports: [
        UsersService,
    ]
})
export class UsersModule {}