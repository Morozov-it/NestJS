import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {

    async createFile(image: any): Promise<string> {
        try {
            //генерация уникального названия
            const fileName = uuid.v4() + '.jpg'

            //указание пути для сохранения файла
            const folder = path.resolve(__dirname, '..', 'static')

            if (!fs.existsSync(folder)) {
                //если такой папки нет, то создается новая
                fs.mkdirSync(folder, { recursive: true })
            }

            //сохранение файла по указанному пути
            fs.writeFileSync(path.join(folder, fileName), image.buffer)

            return fileName
        } catch (e) {
            throw new HttpException('Creating file error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
