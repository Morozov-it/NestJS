import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/api')
export class AppController {

    constructor(private appService: AppService) {}
    
    //декоратор с указанием метода и endpoint
    @Get('/users')
    getUsers() {
        return this.appService.getUsers()
    }
}