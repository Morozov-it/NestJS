import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
//Users
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";
//Roles
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
//Auth
import { AuthModule } from './auth/auth.module';
//Posts
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/posts.model";
import { FilesModule } from './files/files.module';

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
        //для раздачи файлов, начальная папка dist
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        //подключение k бд
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Post], //импорт ВСЕХ моделей для бд
            autoLoadModels: true
        }),
        //подключение модулей
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
    ]
})
export class AppModule {}