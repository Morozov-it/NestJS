import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from "src/errors/validation.exception";

//pipes нужны для преобразования входных данных или валидации этих данных
@Injectable()
export class ValidationPipe implements PipeTransform {

    //стандартный метод PipeTransform
    async transform(value: any, metadata: ArgumentMetadata) {
        //получение объекта из тела запроса
        const obj = plainToClass(metadata.metatype, value)

        //получение всех ошибок из объекта
        const errors = await validate(obj)
        if (errors.length) {
            let messages = errors.map((err) => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })

            throw new ValidationException(messages)
        }

        return value
    }

}