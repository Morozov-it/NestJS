import { Injectable } from "@nestjs/common";

//этот сервис внедряется в контроллер
@Injectable()
export class AppService {

    //методы с логикой взаимодействия с бд и прочее
    getUsers() {
        return [{id:'1', name: 'igor'}]
    }
}