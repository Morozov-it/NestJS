import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from "./users/users.module";


//декоратор - добавляет классу или функции новый функционал
@Module({
    //контроллеры для работы с эндпоинтами
    //controllers: [AppController],

    //переиспользуемые компоненты или сервисы с логикой
    //providers: [AppService],

    //импорты готовых модулей и бд
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        //подключение бд
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User], //импорт всех моделей для бд
            autoLoadModels: true
        }),
        //подключение модулей
        UsersModule,
    ]
})
export class AppModule {

}