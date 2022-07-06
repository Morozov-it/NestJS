import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/api')
export class AppController {
    //dependency injection - добавление сервиса в конструктор класса контроллера
    constructor(private appService: AppService) {}
    
    //декоратор с указанием метода (@GET, @POST ...) и endpoint
    @Get('/users')
    getUsers() {
        return this.appService.getUsers()
    }
}