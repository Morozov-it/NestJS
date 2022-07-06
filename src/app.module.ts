import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
//Users
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";
//Roles
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';


//декоратор - добавляет классу или функции новый функционал
@Module({
    //контроллеры для работы с эндпоинтами
    //controllers: [AppController],

    //переиспользуемые компоненты или сервисы с логикой
    //providers: [AppService],

    //импорты готовых модулей и бд
    imports: [
        //подключение к файлам .env при запуске
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        //подключение k бд
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles], //импорт ВСЕХ моделей для бд
            autoLoadModels: true
        }),
        //подключение модулей
        UsersModule,
        RolesModule,
        AuthModule,
    ]
})
export class AppModule {}