import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { Request } from 'express'
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
    //внедрение модели
    constructor(@InjectModel(Post) private postModel: typeof Post,
        private filesService: FilesService) { }

    async createPost(req: Request, image: any) {
        const dto: CreatePostDto = req.body
        const userId: number = (req as Request & { user: any }).user.id

        //сохранение файла в папке static
        const filename = await this.filesService.createFile(image)

        //запись в таблицу бд
        const post = await this.postModel.create({ ...dto, userId, image: filename })
        return post
    }
}
