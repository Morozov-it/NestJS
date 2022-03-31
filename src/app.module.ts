import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

//декоратор - добавляет классу или функции новый функционал
@Module({
    //контроллеры для работы с эндпоинтами
    controllers: [AppController],

    //переиспользуемые компоненты или сервисы с логикой
    providers: [AppService]
})
export class AppModule {

}