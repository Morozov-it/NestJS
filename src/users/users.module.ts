import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { UsersService } from "./users.service";


@Module({
    //контроллеры для работы с endpoints
    controllers: [UsersController],
    //сервисы с логикой взаимодействия с бд
    providers: [UsersService],
    //ссылка на модель в бд
    imports: [
        SequelizeModule.forFeature([User])
    ]
})
export class UsersModule {}